async function handler() {
  try {
    const sources = [
      "https://techcrunch.com",
      "https://www.theverge.com",
      "https://www.wired.com",
    ];

    const articles = [];
    for (const url of sources) {
      const response = await fetch("/integrations/web-scraping/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          getText: true,
        }),
      });

      const content = await response.text();

      const titleMatches = content.match(/<h1[^>]*>(.*?)<\/h1>/g) || [];
      const paragraphMatches = content.match(/<p[^>]*>(.*?)<\/p>/g) || [];
      const urlMatches =
        content.match(/href="(https:\/\/[^"]*article[^"]*)"/) || [];

      if (titleMatches.length > 0 && paragraphMatches.length > 0) {
        articles.push({
          title: titleMatches[0].replace(/<[^>]+>/g, "").trim(),
          original_content: paragraphMatches[0].replace(/<[^>]+>/g, "").trim(),
          url: urlMatches[1] || url,
          published_date: new Date(),
        });
      }
    }

    if (articles.length === 0) {
      return {
        status: "error",
        message: "No articles found",
      };
    }

    const values = articles
      .map(
        (_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`
      )
      .join(",");
    const insertQuery = `
      INSERT INTO articles (title, original_content, url, published_date)
      VALUES ${values}
      ON CONFLICT (url) DO NOTHING
      RETURNING id, title, original_content, url, published_date
    `;

    const flatValues = articles.flatMap((v) => [
      v.title,
      v.original_content,
      v.url,
      v.published_date,
    ]);
    const result = await sql(insertQuery, flatValues);

    return {
      status: "success",
      message: "News articles fetched and stored",
      articles: result,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
}