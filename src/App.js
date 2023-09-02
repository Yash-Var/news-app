import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Country } from "country-state-city";
import Shimmmer from "./Shimmer";

const entriesPerPage = 12;
function App() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const endIndex = startIndex + entriesPerPage;
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=3fd8604c90e845679b3352fb31ffc7b2&page=${number}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const topNews = [
    {
      title: "Breaking News 1",
      description: "This is a breaking news article.",
      image: "news1.jpg",
      author: "yash Doe",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    {
      title: "Latest Update",
      description: "Here's the latest update on an important event.",
      image: "news2.jpg",
      author: "Jane Smith",
      // Add more fields as needed
    },
    // Add more news items as needed
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredNews = data?.filter((news) => {
    return news?.author?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const countryData = Country.getAllCountries();
    setCountries(countryData);
  }, []);
  useEffect(() => {
    let apiUrl;
    if (selectedCountry) {
      setStartIndex(0);

      apiUrl = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=3fd8604c90e845679b3352fb31ffc7b2`;
    } else {
      apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=3fd8604c90e845679b3352fb31ffc7b2&page=${number}`;
    }

    setCurrentPage(1);

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        setData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedCountry, number]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setStartIndex(startIndex - entriesPerPage);
    }
  };

  const handleNextPage = () => {
    if (endIndex < filteredNews?.length) {
      setCurrentPage(currentPage + 1);
      setStartIndex(startIndex + entriesPerPage);
    }
  };
  let newNews;
  newNews = filteredNews?.slice(startIndex, endIndex);
  console.log(newNews, startIndex, endIndex);

  return (
    <div>
      <div className="heading">
        <h1>News Wave</h1>
      </div>

      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by author name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="country-select"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedCountry(e.target.value);
            }}
          >
            <option value="">Select a country</option>
            {countries?.map((country, index) => (
              <option key={index} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="news-container">
        <h2>TOP NEWS</h2>
        {data?.length === 0 ? (
          selectedCountry ? (
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              News not found for the selected country
            </h1>
          ) : (
            <Shimmmer />
          )
        ) : (
          <div className="divider">
            {newNews?.length === 0 ? (
              <h1>News not found for the selected country</h1>
            ) : (
              newNews?.map((news, index) => (
                <div className="news-item" key={index}>
                  <img src={news?.urlToImage} alt="Image missing" />
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <p className="author-text">Author: {news.author}</p>
                </div>
              ))
            )}
          </div>
        )}
        <div className="pagination">
          <button
            className="previous-btn"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span>
            {data?.length === 0 || newNews?.length === 0
              ? "0/0"
              : `${currentPage}/${Math.ceil(
                  filteredNews?.length / entriesPerPage
                )}`}
          </span>

          <button
            className="next-btn"
            disabled={endIndex >= filteredNews?.length}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
