async function handler({ id }) {
  if (!id) {
    return {
      status: "error",
      message: "Article ID is required",
    };
  }

  try {
    const [article] = await sql`
      SELECT id, title, original_content 
      FROM articles 
      WHERE id = ${id} AND summary IS NULL
    `;

    if (!article) {
      return {
        status: "error",
        message: "Article not found or already has a summary",
      };
    }

    const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a professional content summarizer. Create a concise summary of the article.",
          },
          {
            role: "user",
            content: `Title: ${article.title}\n\nContent: ${article.original_content}`,
          },
        ],
      }),
    });

    const chatResponse = await response.json();
    const summary = chatResponse.choices[0].message.content;

    const [updatedArticle] = await sql`
      UPDATE articles 
      SET summary = ${summary}
      WHERE id = ${id}
      RETURNING id, title, summary
    `;

    return {
      status: "success",
      article: updatedArticle,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}