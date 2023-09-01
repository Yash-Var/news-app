import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Country } from "country-state-city";

function App() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Define the API URL you want to fetch data from
    const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=3fd8604c90e845679b3352fb31ffc7b2&page=${number}`;

    // Make an Axios GET request
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the successful response
        // con(response);
        setData(response.data.articles);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
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
    // con(event.target.value);
    setSearchQuery(event.target.value);
  };
  const filteredNews = data?.filter((news) => {
    return news?.author?.toLowerCase().includes(searchQuery.toLowerCase());
  });
  // con(filteredNews);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    // Fetch countries using the library
    const countryData = Country.getAllCountries();
    setCountries(countryData);
  }, []);
  useEffect(() => {
    // con(selectedCountry);
    if (selectedCountry) {
      // Define the new API URL based on the selected country
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=3fd8604c90e845679b3352fb31ffc7b2`;

      // Make an Axios GET request
      axios
        .get(apiUrl)
        .then((response) => {
          // Handle the successful response
          // con(response);
          console.log(response);
          setData(response.data.articles);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error fetching data:", error);
        });
    } else {
      const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=3fd8604c90e845679b3352fb31ffc7b2&page=${number}`;

      // Make an Axios GET request
      axios
        .get(apiUrl)
        .then((response) => {
          // Handle the successful response
          // con(response);
          console.log(response);
          setData(response.data.articles);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedCountry]);

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
              // con(e.target.value);
              console.log(e.target.value);
              setSelectedCountry(e.target.value);
            }}
          >
            <option value="">Select a country</option>
            {countries?.map((country, index) => (
              // console.log(country),
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
            <h1>News not found for the selected country</h1>
          ) : (
            <h1>No data</h1>
          )
        ) : (
          <div className="divider">
            {filteredNews?.length === 0 ? (
              <p>No news to display</p>
            ) : (
              filteredNews?.map((news, index) => (
                <div className="news-item" key={index}>
                  <img src={news?.urlToImage} alt="Image missing" />
                  <h3>{news.title}</h3>
                  <p>{news.description}</p>
                  <p>Author: {news.author}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
