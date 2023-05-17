import React, { useEffect, useState } from "react";
import axios from "axios";

const WorldNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchNewsArticles = async () => {
      const options = {
        method: "POST",
        url: "https://specrom-news-api.p.rapidapi.com/",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "8febb3a430msh4463d044dae5887p120b5bjsn886f43c1ee6b",
          "X-RapidAPI-Host": "specrom-news-api.p.rapidapi.com",
        },
        data: {
          api_type: "news_by_city_country",
          country: "AF",
          region: "Afghanistan",
        },
      };

      try {
        const response = await axios.request(options);
        if (isMounted) {
          setArticles(response.data?.data || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewsArticles();

    return () => {
      // Cleanup function to cancel any ongoing asynchronous tasks
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2>Afghanistan News</h2>
      {articles.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorldNews;
