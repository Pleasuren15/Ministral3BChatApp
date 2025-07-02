import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(""); // Add state for fetched content

  const handleInputChange = (e) => setPrompt(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      fetch(
        `https://localhost:44332/api/Chat/query?query=${encodeURIComponent(
          prompt
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setContent(data); // Set content state instead of manipulating DOM
          console.log(data);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="top-bar">
        <input
          className="prompt-input"
          type="text"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="info-space">
        <div className="info-left">
          <span>PleasureNdhlovu</span>
          <img
            src="https://cdn-avatars.huggingface.co/v1/production/uploads/1583646260758-5e64858c87403103f9f1055d.png"
            width="15"
            height="15"
            alt="Hugging Face Logo"
          />
          <span>microsoft/phi-4</span>
        </div>
      </div>

      <div className="content">
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span className="spinner" />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {content
              ? content
              : "Your asnwers to your prompt will be displayed here."}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
