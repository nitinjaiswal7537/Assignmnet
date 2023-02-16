import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [apiResponse, setApiResponse] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [likeFilter, setLikeFilter] = useState("");
  const [replyFilter, setReplyFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://dev.ylytic.com/ylytic/test");
      setApiResponse(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = apiResponse;
    if (dateFilter !== "") {
      data = data.filter((item) => item.createdAt.includes(dateFilter));
    }
    if (authorFilter !== "") {
      data = data.filter((item) => item.author.includes(authorFilter));
    }
    if (textFilter !== "") {
      data = data.filter((item) => item.text.includes(textFilter));
    }
    if (likeFilter !== "") {
      data = data.filter((item) => item.like >= Number(likeFilter));
    }
    if (replyFilter !== "") {
      data = data.filter((item) => item.reply >= Number(replyFilter));
    }
    setFilteredData(data);
  }, [apiResponse, dateFilter, authorFilter, textFilter, likeFilter, replyFilter]);

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthorFilter(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleLikeChange = (e) => {
    setLikeFilter(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReplyFilter(e.target.value);
  };

  const handleClearFilters = () => {
    setDateFilter("");
    setAuthorFilter("");
    setTextFilter("");
    setLikeFilter("");
    setReplyFilter("");
  };

  return (
    <div className="App">
      <h1>API Response Table</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="dateFilter">Date:</label>
          <input type="text" id="dateFilter" value={dateFilter} onChange={handleDateChange} />
        </div>
        <div className="filter">
          <label htmlFor="authorFilter">Author:</label>
          <input type="text" id="authorFilter" value={authorFilter} onChange={handleAuthorChange} />
        </div>
        <div className="filter">
          <label htmlFor="textFilter">Text:</label>
          <input type="text" id="textFilter" value={textFilter} onChange={handleTextChange} />
        </div>
        <div className="filter">
          <label htmlFor="likeFilter">Like:</label>
          <input type="number" id="likeFilter" value={likeFilter} onChange={handleLikeChange} />
        </div>
        <div className="filter">
          <label htmlFor="replyFilter">Reply:</label>
          <input type="number" id="replyFilter" value={replyFilter} onChange={handleReplyChange} />
        </div>
        <button className="clear-filters" onClick={handleClearFilters}>Clear Filters</button>
      </div>
      </div>

      )};
      export default App;
