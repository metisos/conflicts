import { useEffect, useState } from "react";
import axios from "axios";

const WeatherCard = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: location },
        headers: {
          "X-RapidAPI-Key":
            "8febb3a430msh4463d044dae5887p120b5bjsn886f43c1ee6b",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <h2>Current Weather</h2>
      <p>Location: {weatherData.location.name}</p>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
    </div>
  );
};

export default WeatherCard;
