"use client";
import React from "react";

function MainComponent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await fetch("/api/saved-articles", { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to fetch saved articles");
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError("Unable to load your saved articles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedArticles();
  }, []);

  const handleRemoveArticle = async (id) => {
    try {
      const response = await fetch("/api/remove-saved-article", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to remove article");
      setArticles(articles.filter((article) => article.id !== id));
    } catch (err) {
      setError("Unable to remove article");
      console.error(err);
    }
  };

  const handleSaveNote = async (id) => {
    try {
      const response = await fetch("/api/update-article-note", {
        method: "POST",
        body: JSON.stringify({ id, note: noteContent }),
      });
      if (!response.ok) throw new Error("Failed to save note");

      setArticles(
        articles.map((article) =>
          article.id === id ? { ...article, note: noteContent } : article
        )
      );
      setEditingNoteId(null);
      setNoteContent("");
    } catch (err) {
      setError("Unable to save note");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 h-40 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600 dark:text-red-400 font-inter">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 font-inter"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold font-inter text-gray-900 dark:text-white mb-4">
            No Saved Articles
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-inter">
            Articles you save will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-inter text-gray-900 dark:text-white mb-8">
          Saved Articles
        </h1>

        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold font-inter text-gray-900 dark:text-white">
                  {article.title}
                </h2>
                <button
                  onClick={() => handleRemoveArticle(article.id)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-inter text-gray-900 dark:text-white mb-2">
                    Original Content
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-inter">
                    {article.original_content}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-inter text-gray-900 dark:text-white mb-2">
                    AI Summary
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 font-inter">
                    {article.summary}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-inter text-gray-900 dark:text-white mb-2">
                    Notes
                  </h3>
                  {editingNoteId === article.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded font-inter 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        rows="3"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveNote(article.id)}
                          className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded 
                                   hover:bg-gray-700 dark:hover:bg-gray-600 font-inter"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingNoteId(null);
                            setNoteContent("");
                          }}
                          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded 
                                   text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white 
                                   dark:hover:bg-gray-700 font-inter"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditingNoteId(article.id);
                        setNoteContent(article.note || "");
                      }}
                      className="cursor-pointer p-2 border border-gray-200 dark:border-gray-700 
                               rounded min-h-[60px] hover:border-gray-400 dark:hover:border-gray-500"
                    >
                      {article.note || "Click to add notes..."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;