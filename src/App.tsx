import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';
import Nav from './containers/Nav/Nav';

const WEATHER_API_KEY = "29ab9a6146d048d28d0133818241212";

function App() {
  const [location, setLocation] = useState<string | null>(null); 
  const [weather, setWeather] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setErrorMessage("Geolocation not supported in this browser.");
    }
  }, []);

  const success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    setLocation(`${latitude},${longitude}`);
    fetchWeatherData(latitude, longitude);
  }

  const error = () => {
    setErrorMessage("Unable to retrieve your location.");
  }


  const fetchWeatherData = (latitude: number, longitude: number) => {
    setLoading(true);
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=yes`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage("Failed to fetch weather data.");
        setLoading(false);
        console.error(error);
      });
  }


  return (
    <>

      <div>

        {location && <p>Location: {location}</p>}
        {loading && <p>Loading weather data...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {weather && !loading && !errorMessage ? (

          <div>
            <h2>Weather Data:</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="" />
            <p>feels like: {weather.current.feelslike_c}</p>
            <p>chance of rain {weather.forecast.forecastday[0].day.daily_chance_of_rain}</p>
            <p>max temp {weather.forecast.forecastday[0].day.maxtemp_c
            }</p>
            <p>min temp {weather.forecast.forecastday[0].day.mintemp_c
            }</p>
          </div>

        ) : null}
      </div>
      <Nav />
      <Dashboard />
    </>
  );
}

export default App;
