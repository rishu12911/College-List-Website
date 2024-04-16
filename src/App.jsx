// App.js

import React, { useState } from "react";
import College from "./College.json";

const App = () => {
  // State variables
  const [load, setLoad] = useState(10); // Number of items to load
  const [list, setList] = useState(College.slice(0, 10)); // List of colleges
  const [sortConfig, setSortConfig] = useState({
    // Sorting configuration
    key: null,
    direction: "ascending",
  });
  const [activeTH, setActiveTH] = useState(null); // Active table header
  const [search, setSearch] = useState(""); // Search input value

  // Load more data
  const handleLoad = () => {
    setLoad((prev) => prev + 10);
    setList(College.slice(0, load));
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortList(key, direction);
    setActiveTH(key); // Set the active TH when clicked
  };

  // Sort the list based on key and direction
  const sortList = (key, direction) => {
    const sortedList = [...list].sort((a, b) => {
      if (direction === "ascending") {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setList(sortedList);
  };

  // Handle search input
  const handleSearch = () => {
    if (search.trim() === "") {
      return;
    }
    const filterList = College.filter((item) =>
      item.university_name.toLowerCase().includes(search.toLowerCase())
    );
    setList(filterList);
  };

  return (
    <div>
      <h1>College Details</h1>

      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search your College"
      />

      <button onClick={handleSearch}>Go</button>

      <table>
        <thead>
          <tr>
            <th className={activeTH === "index" ? "active" : ""}> Index </th>

            <th className={activeTH === "college_name" ? "active" : ""}>
              College Name
            </th>

            <th
              className={activeTH === "fees" ? "active" : ""}
              onClick={() => handleSort("fees")}
            >
              Fees
            </th>

            <th
              className={activeTH === "average_ctc" ? "active" : ""}
              onClick={() => handleSort("average_ctc")}
            >
              Placement CTC
            </th>

            <th
              className={activeTH === "rating_out_of_10" ? "active" : ""}
              onClick={() => handleSort("rating_out_of_10")}
            >
              User Rating
            </th>

            <th
              className={activeTH === "world_ranking" ? "active" : ""}
              onClick={() => handleSort("world_ranking")}
            >
              World Ranking
            </th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>
                {item.university_name}

                {item.feature_value ? (
                  <span className="feature"> *Featured* </span>
                ) : null}
              </td>

              <td>{item.fees}</td>

              <td>{item.average_ctc}</td>

              <td>{item.rating_out_of_10}</td>

              <td>{item.world_ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Load More  */}
      <button onClick={handleLoad}> Load More </button>
    </div>
  );
};

export default App;
