import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import "./App.css";
import axios from "axios";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-sql";



const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll(); // Re-highlight code when it changes
  }, [language]);

  async function reviewCode(){
    const response = await axios.post('http://localhost:3000/ai/get-review', {code: code, language});
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="selectLanguage">
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
              <option value="swift">Swift</option>
              <option value="sql">SQL</option>
            </select>
          </div>

          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>{
                const prismLanguage = Prism.languages[language] || Prism.languages.javascript; // Fallback
                return Prism.highlight(code, prismLanguage, language);
              }
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                minHeight: "200px",
                lineHeight: 1.5,
                width: "100%",
                backgroundColor: "#2d2d2d", // Dark background
                color: "white", // Set text color to white
                caretColor: "white", // Ensure cursor is visible
              }}
            />
          </div>
          <div 
          onClick={reviewCode}
          className="review"
          >Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default App;
