"use client";
import axios from "axios";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { handlePlaceHolderforFilter, options } from "./constant";

const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const [results, setResults] = useState(null);
  const [sizeKey, setSizeKey] = useState("");
  const [fullSearchKey, setFullSearchKey] = useState("");
  const [filterId, setFilterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestTime, setRequestTime] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [filterPlaceholder, setFilterPlaceholder] = useState("");

  const handleOptionChange = (e: any) => {
    const placeholder = handlePlaceHolderforFilter(e.target.value);
    setFilterPlaceholder(placeholder);
    setSelectedOption(e.target.value);
  };

  const handleAllLogs = async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      const response = await axios.get(`http://localhost:3000/api/logs`);
      const endTime = performance.now();
      setRequestTime(endTime - startTime);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleLevel = async () => {
    try {
      setLoading(true);
      if (sizeKey === "") {
        setSizeKey("10");
      }
      const startTime = performance.now();
      const response = await axios.get(
        `http://localhost:3000/api/logs/level/${searchKey}/${sizeKey}`
      );
      const endTime = performance.now();
      setRequestTime(endTime - startTime);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleFullSearch = async () => {
    try {
      setLoading(true);
      const startTime = performance.now();
      const response = await axios.get(
        `http://localhost:3000/api/logs/search/${fullSearchKey}`
      );
      const endTime = performance.now();
      setRequestTime(endTime - startTime);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    let url = "";

    switch (selectedOption) {
      case "resourceId":
        url = `http://localhost:3000/api/logs/unisearch/metadata/${filterId}`;
        break;
      case "message":
        url = `http://localhost:3000/api/logs/message/${filterId}`;
        break;
      case "timestamp":
        url = `http://localhost:3000/api/logs/unisearch?timestamp=${filterId}`;
        break;
      case "traceId":
        url = `http://localhost:3000/api/logs/unisearch?traceId=${filterId}`;
        break;
      case "commit":
        url = `http://localhost:3000/api/logs/unisearch?commit=${filterId}`;
        break;
      case "spanId":
        url = `http://localhost:3000/api/logs/unisearch?spanId=${filterId}`;
        break;
    }
    alert(url);
    try {
      setLoading(true);
      const startTime = performance.now();
      const response = await axios.get(url);
      const endTime = performance.now();
      setRequestTime(endTime - startTime);
      setResults(response.data);
    } catch (error) {}
  };
  return (
    <div className="flex text-black">
      <div className="flex flex-col w-1/2 p-4 m-10 mb-4 gap-y-5  border-dashed border-2 border-sky-500">
        <div>
          <button
            onClick={handleAllLogs}
            className="w-3/4 mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Loading..." : "View All logs"}
          </button>
        </div>
        <div className="flex max-w-md flex-row gap-x-3">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-gray-700 pr-2"
              type="text"
              id="search"
              onChange={(e) => setFullSearchKey(e.target.value)}
              placeholder="full logs search"
            />
          </div>
          <button
            onClick={handleFullSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        <div className="flex flex-row gap-5 ">
          <input
            type="text"
            id="levelInput"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter level value"
            className="w-3/4 px-4 py-2  border rounded-md"
          />
          <input
            type="number"
            id="sizeInput"
            value={sizeKey}
            placeholder="Enter size Optional"
            onChange={(e) => setSizeKey(e.target.value)}
            className="w-3/4 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleLevel}
            className="w-3/4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Loading..." : "View logs by level"}
          </button>
        </div>

        <div className="flex flex-col text-white">
          <h1 className="text-xl">Filter by </h1>
          {options.map((option) => (
            <div key={option} className="flex-row items-center space-x-2">
              <input
                type="radio"
                id={option}
                name="searchOption"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="text-white"
              />
              <label className="text-white" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
          {selectedOption && (
            <input
              type="text"
              placeholder={filterPlaceholder}
              onChange={(e) => setFilterId(e.target.value)}
              className="w-3/4 px-4 py-2 border rounded-md text-black"
            />
          )}
          <button
            onClick={handleFilter}
            className="w-3/4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            filter
          </button>
        </div>
      </div>

      <div className="w-1/2 p-4 m-10 mb-4 border-dashed border-2 border-sky-500">
        {results ? (
          <>
            <p className="text-green-500">
              Request Time: {requestTime} milliseconds
            </p>
            <SyntaxHighlighter language="json" theme={dark}>
              {JSON.stringify(results, null, 2)}
            </SyntaxHighlighter>
          </>
        ) : (
          <p className="text-gray-500">{error || "No results to display"}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
