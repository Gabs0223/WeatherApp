// --- Main variables ---
let city = document.querySelector("#searchBar");
let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
let units = `metric`;

// --- Dates ---
let dateNow = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = dateNow.getDay();
let month = dateNow.getMonth();

let minNow = 0;
if (dateNow.getMinutes() <= 9) {
  minNow = `0${dateNow.getMinutes()}`;
} else {
  minNow = dateNow.getMinutes();
}
// full date => August 5, 2021 | 22:54
// date => August 5, 2021
document.querySelector("#dia").innerHTML = `${
  months[month]
} ${dateNow.getDate()}, ${dateNow.getFullYear()}`;
// hour => 19:00
document.querySelector("#hora").innerHTML = `${dateNow.getHours()}:${minNow}`;
// day => Sunday
document.querySelector("#dayToday").innerHTML = `${days[day]}`;

// capitalize a word
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
// temperature, description, wind, and humidity
function tempInC(response) {
  let tempNow = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;

  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}km/h`;
  document.querySelector("h2").innerHTML = `${tempNow}`;
  document.querySelector("#description").innerHTML = `${description}`;

  console.log(response.data.coord);
  getForecast(response.data.coord);
}
// weather icons id
function iconW(response) {
  let icon = response.data.weather[0].icon;
  if (icon === "01d") {
    document.getElementById("descIm").src = "images/033-sun.svg";
  } else if (icon === "01n") {
    document.getElementById("descIm").src = "images/019-moon.svg";
  } else if (icon === "02d" || icon === "03d" || icon === "04d") {
    document.getElementById("descIm").src = "images/046-cloudy.svg";
  } else if (icon === "02n" || icon === "03n" || icon === "04n") {
    document.getElementById("descIm").src = "images/013-night.svg";
  } else if (icon === "09d" || icon === "09n") {
    document.getElementById("descIm").src = "images/005-rain.svg";
  } else if (icon === "10d") {
    document.getElementById("descIm").src = "images/047-rainy.svg";
  } else if (icon === "10n") {
    document.getElementById("descIm").src = "images/049-rain.svg";
  } else if (icon === "11d" || icon === "11n") {
    document.getElementById("descIm").src = "images/026-storm.svg";
  } else if (icon === "13d" || icon === "13n") {
    document.getElementById("descIm").src = "images/011-snow.svg";
  } else if (icon === "50d") {
    document.getElementById("descIm").src = "images/014-haze.svg";
  } else if (icon === "50n") {
    document.getElementById("descIm").src = "images/037-foggy.svg";
  }
}

// ----SEARCH A CITY----
function searchCity(event) {
  event.preventDefault();
  document.querySelector("h1").innerHTML = city.value;

  let cityName = capitalize(city.value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(tempInC);
  axios.get(apiUrl).then(iconW);
}
// search a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", searchCity);
// search a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", searchCity);

// ---CURRENT LOCATION---
function currentLoc(event) {
  event.preventDefault();
  function nameC(response) {
    let changeH1 = document.querySelector("h1");
    changeH1.innerHTML = `${response.data.name} `;
  }
  function currentTemp(position) {
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

    axios.get(urlCoords).then(nameC);
    axios.get(urlCoords).then(tempInC);
    axios.get(urlCoords).then(iconW);
  }
  navigator.geolocation.getCurrentPosition(currentTemp);
}
document.querySelector("#currentLoc").addEventListener("click", currentLoc);

// ---FORECAST 5 DAYS---
// day of the week
function dayOW(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}
// weather icon
function getIcon(icon) {
  let imsrc = "";

  if (icon === "01d") {
    imsrc = "images/033-sun.svg";
  } else if (icon === "01n") {
    imsrc = "images/019-moon.svg";
  } else if (icon === "02d" || icon === "03d" || icon === "04d") {
    imsrc = "images/046-cloudy.svg";
  } else if (icon === "02n" || icon === "03n" || icon === "04n") {
    imsrc = "images/013-night.svg";
  } else if (icon === "09d" || icon === "09n") {
    imsrc = "images/005-rain.svg";
  } else if (icon === "10d") {
    imsrc = "images/047-rainy.svg";
  } else if (icon === "10n") {
    imsrc = "images/049-rain.svg";
  } else if (icon === "11d" || icon === "11n") {
    imsrc = "images/026-storm.svg";
  } else if (icon === "13d" || icon === "13n") {
    imsrc = "images/011-snow.svg";
  } else if (icon === "50d") {
    imsrc = "images/014-haze.svg";
  } else if (icon === "50n") {
    imsrc = "images/037-foggy.svg";
  }
  return imsrc;
}
// forecast
function dispForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#wf");
  let forecastCol = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastCol =
        forecastCol +
        `<div class="col forecast">
        <p class="textFore">${dayOW(forecastDay.dt)}</p>
        <img src="${getIcon(
          forecastDay.weather[0].icon
        )}" class="forecastIcon" />
        <p class="textFore">
          <span class="maxTemp">${Math.round(forecastDay.temp.max)}°</span>
          <span class="minTemp">${Math.round(forecastDay.temp.min)}°</span>
        </p>
    </div>
  `;
    }
  });

  forecastCol = forecastCol + `</div>`;
  forecastElement.innerHTML = forecastCol;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispForecast);
}
