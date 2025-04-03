"use client";
import React from "react";

function MainComponent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/fetch-news", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError("Failed to load articles. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (id) => {
    try {
      setSummarizing(true);
      const response = await fetch("/api/summarize-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to summarize article");
      }
      const data = await response.json();
      setArticles((prev) =>
        prev.map((article) =>
          article.id === id
            ? { ...article, summary: data.article.summary }
            : article
        )
      );
    } catch (err) {
      setError("Failed to summarize article. Please try again later.");
      console.error(err);
    } finally {
      setSummarizing(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          News Research Tool
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            {loading ? (
              <div className="space-y-4">
                {[...Array.from({ length: 5 })].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedArticle?.id === article.id
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(article.published_date).toLocaleDateString()}
                      </span>
                      <button
                        className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Save functionality would go here
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Article Details
            </h2>
            {selectedArticle ? (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  {selectedArticle.title}
                </h3>
                {selectedArticle.summary ? (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Summary
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedArticle.summary}
                    </p>
                  </div>
                ) : (
                  <button
                    className="mb-6 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSummarize(selectedArticle.id)}
                    disabled={summarizing}
                  >
                    {summarizing ? "Generating Summary..." : "Generate Summary"}
                  </button>
                )}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Original Content
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedArticle.original_content}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Select an article to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;