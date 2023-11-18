"use client";
import axios from "axios";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState(null);

  const handleAllLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/logs`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults(null);
    }
  };

  return (
    <div className="flex text-black">
      <div className="flex  flex-col w-1/2 p-4 m-10 mb-4">
        <div>
          <button
            onClick={handleAllLogs}
            className="w-3/4 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            View All logs
          </button>
        </div>
        <div>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter search key"
            className="w-3/4 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter search key"
            className="w-3/4 px-4 text-black py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="w-1/2 p-2 ">
        {results ? (
          <SyntaxHighlighter language="json" theme={dark}>
            {JSON.stringify(results, null, 2)}
          </SyntaxHighlighter>
        ) : (
          <p className="text-gray-500">No results to display</p>
        )}
      </div>
    </div>
  );
};

export default Home;
