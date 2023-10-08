import React, { useState } from "react";
import "./WeatherApp.css";

import searchIcon from "../Assets/search.png";
import cloudIcon from "../Assets/sol-com-nuvens.png";
import humidityIcon from "../Assets/umidade.png";
import windIcon from "../Assets/vento.png";
import sunIcon from "../Assets/sol.png";
import drizzerIcon from "../Assets/chuva-com-sol.png";
import cityNotFoundIcon from "../Assets/location-not-found.png";

// import drizzerIcon from "../Assets/chuva.png";
import rainIcon from "../Assets/chuva.png";
import snowIcon from "../Assets/nevasca.png";

const WeatherApp = () => {
  let api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [wicon, setWicon] = useState(cloudIcon);
  const [cityNotFound, setCityNotFound] = useState(false);

  const search = async () => {
    setCityNotFound(false);
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    if (data.cod === "404" && data.message === "city not found") {
      return setCityNotFound(true);
    }

    humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "  km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(sunIcon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudIcon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzerIcon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzerIcon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rainIcon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rainIcon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snowIcon);
    } else {
      setWicon(sunIcon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={searchIcon} alt="" width="70px" height="70px" />
        </div>
      </div>
      {cityNotFound ? (
        <div className="message-container">
          <div className="city-not-found-box">
            <img
              src={cityNotFoundIcon}
              alt=""
              className="city-not-found-message-icon"
              width="200px"
              height="200px"
            />
            <div className="city-not-found-message">City not found</div>
          </div>
        </div>
      ) : (
        <>
          <div className="weather-image">
            <img src={wicon} alt="" width="200px" height="200px" />
          </div>
          <div className="weather-temp"> 24°c</div>
          <div className="weather-location">London</div>
          <div className="data-container">
            <div className="element">
              <img
                src={humidityIcon}
                alt=""
                className="icon"
                width="50px"
                height="50px"
              />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
              </div>
            </div>

            <div className="element">
              <img
                src={windIcon}
                alt=""
                className="icon"
                width="50px"
                height="50px"
              />
              <div className="data">
                <div className="wind-rate">18km/h</div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
