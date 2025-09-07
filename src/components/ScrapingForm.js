import React, { useState } from "react";
import axios from "axios";

const API_TOKEN = "MySuperSecretToken123!";  // Must match backend token

function ScrapingForm() {
  const [url, setUrl] = useState("");
  const [dataType, setDataType] = useState("general");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url) {
      setError("Please enter a URL to scrape.");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/scrape",
        { url, dataType },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to scrape data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Web Scraping Form</h2>
      <input
        type="text"
        placeholder="Enter URL to scrape"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
        disabled={loading}
      />
      <select
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
        disabled={loading}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      >
        <option value="general">General</option>
        <option value="news">News</option>
        <option value="quotes">Quotes</option>
        <option value="weather">Weather</option>
      </select>
      <button
        onClick={handleScrape}
        disabled={loading}
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: 16,
        }}
      >
        {loading ? "Scraping..." : "Scrape"}
      </button>
      {error && (
        <p style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>
          {error}
        </p>
      )}
      <div style={{ marginTop: 20 }}>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 10,
                borderRadius: 4,
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <p style={{ fontSize: 12, color: "#666" }}>
                Source: {item.source} | Type: {item.type} |{" "}
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No results to display.</p>
        )}
      </div>
    </div>
  );
}

export default ScrapingForm;
