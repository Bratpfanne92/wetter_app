window.addEventListener("DOMContentLoaded", () => {
  const apiKey = "57ee032a9e12755d06c48556971c5fb0";

  function getLocalStorage() {
    const cityInput = localStorage.getItem("city");
    document.getElementById("cityInput").value = cityInput;
    getForecast();
    getWeather();
  }

  if (localStorage.getItem("city")) {
    getLocalStorage();
  }
  async function getWeather() {
    try {
      const cityInput = document.getElementById("cityInput").value;
      console.log(cityInput);
      const API_URL_SEARCH_BYCITY = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`; //&units=metric - ha celsiusban akarjuk pl

      const response = await fetch(API_URL_SEARCH_BYCITY);
      const data = await response.json();

      if (data.cod === "400") {
        // ha a város nem létezik...data.cod : hibaüzenet kódja
        throw data;
      }
      // console.log(data);
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

      const result = `
      <h2>Today</h2>
      <img src="${iconUrl}">
      <p>${data.weather[0].description}</p>
      </br>
      <p id="forecast-description">
        ${data.name}: ${data.main.temp} C
      </p>
      `;

      const weather = document.getElementById("weather");
      weather.innerHTML = result;
    } catch (error) {
      console.log(error);
      const errorMessage = "Please enter a valid german city!";
      cityInput.placeholder = errorMessage;
    }
  }

  async function getForecast() {
    try {
      // const apiKey = "57ee032a9e12755d06c48556971c5fb0";
      const cityInput = document.getElementById("cityInput").value;
      const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},DE&appid=${apiKey}&units=metric`;

      const response = await fetch(API_URL_FORECAST);
      const data = await response.json();
      console.log(data);
      console.log(data.city.name);
      const iconUrlTomorrow = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@4x.png`;
      const iconUrlAfterTom = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@4x.png`;
      const result = `
       <div id="forecast-1">
      <h2>Tomorrow</h2>
      <img src="${iconUrlTomorrow}" alt="Icon" />
      <p>${data.list[7].weather[0].description}</p>
      
      <p id="forecast-description">${data.city.name}: ${data.list[7].main.temp} C</p>
      </div>
      <div id="forecast-2">
      <h2>After tomorrow</h2>
      <img src="${iconUrlAfterTom}" alt="Icon" />
      <p>${data.list[14].weather[0].description}</p>
      
      <p id="forecast-description">${data.city.name}: ${data.list[14].main.temp} C</p>
      </div>`;
      const forecast = document.querySelector(".forecast-container");
      forecast.innerHTML = result;
      // console.log(forecast);
    } catch (error) {
      console.log(error);
    }
  }
  // debugger;

  function setLocalStorage() {
    const cityInput = document.getElementById("cityInput").value;
    localStorage.setItem("city", cityInput);
  }

  document.getElementById("forecastBtn").addEventListener("click", (e) => {
    e.preventDefault();

    getWeather();
    getForecast();
    setLocalStorage();
  });
});
console.log(localStorage.getItem("city"));
