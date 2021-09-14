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

// --- Search a city ---
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar");
  document.querySelector("h1").innerHTML = city.value;
}
// search a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", getCity);
// search a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", getCity);

// --- Temperature ---
// capitalize a word
console.log(document.querySelector("#searchBar").value);
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
let units = `metric`;

// get the temperature
function getCityTemp(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    console.log(`${tempNow}°C`);
    let description = response.data.weather[0].description;
    console.log(description);
    document.querySelector("h2").innerHTML = `${tempNow}`;
    document.querySelector("#description").innerHTML = `${description}`;
  }

  axios.get(apiUrl).then(weather);
}
// get the temperature of a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", getCityTemp);
// get the temperature of a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", getCityTemp);

// Temp in °C
function change2celcius(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    document.querySelector("h2").innerHTML = `${tempNow}`;
  }

  axios.get(apiUrl).then(weather);
  document.getElementById("C2").id = "C";
  document.getElementById("F2").id = "F";
}
document.querySelector("#C").addEventListener("click", change2celcius);
// transfotm °C to °F
function change2fahrenheit(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    let tempNowF = Math.round((tempNow * 9) / 5) + 32;
    document.querySelector("h2").innerHTML = `${tempNowF}`;
  }

  axios.get(apiUrl).then(weather);
  document.getElementById("C").id = "C2";
  document.getElementById("F").id = "F2";
}
document.querySelector("#F").addEventListener("click", change2fahrenheit);

// ---Current position temperature---
function currentPos(event) {
  event.preventDefault();
  function weather(response) {
    console.log(response);
    let tempNow = Math.round(response.data.main.temp);
    document.querySelector("h2").innerHTML = `${tempNow}`;
    let changeH1 = document.querySelector("h1");
    changeH1.innerHTML = `${response.data.name} `;

    let wind = response.data.wind.speed;
    let humidity = response.data.main.humidity;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    document.querySelector("#wind").innerHTML = `${wind}km/h`;
  }
  function currentTemp(position) {
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

    axios.get(urlCoords).then(weather);
    document.getElementById("C2").id = "C";
    document.getElementById("F2").id = "F";
  }

  navigator.geolocation.getCurrentPosition(currentTemp);
}
document.querySelector("#currentLoc").addEventListener("click", currentPos);

// ---Wind & Humidity
function getWindHum(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function windHum(response) {
    let wind = response.data.wind.speed;
    let humidity = response.data.main.humidity;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    document.querySelector("#wind").innerHTML = `${wind}km/h`;
  }

  axios.get(apiUrl).then(windHum);
}
// get the Wind & Humidity of a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", getWindHum);
// get the Wind & Humidity of a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", getWindHum);

// --- Weather icons ---
function changeIcon(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function iconW(response) {
    let icon = response.data.weather[0].icon;
    if (icon === "01d") {
      document.getElementById("#descIm").src = "images/033-sun.svg";
    } else if (icon === "01n") {
      document.getElementById("#descIm").src = "images/019-moon.svg";
    } else if (icon === "02d" || icon === "03d" || icon === "04d") {
      document.getElementById("#descIm").src = "images/046-cloudy.svg";
    } else if (icon === "02n" || icon === "03n" || icon === "04n") {
      document.getElementById("#descIm").src = "images/013-night.svg";
    } else if (icon === "09d" || icon === "09n") {
      document.getElementById("#descIm").src = "images/005-rain.svg";
    } else if (icon === "10d") {
      document.getElementById("#descIm").src = "images/047-rainy.svg";
    } else if (icon === "10n") {
      document.getElementById("#descIm").src = "images/049-rain.svg";
    } else if (icon === "11d" || icon === "11n") {
      document.getElementById("#descIm").src = "images/026-storm.svg";
    } else if (icon === "13d" || icon === "13n") {
      document.getElementById("#descIm").src = "images/011-snow.svg";
    } else if (icon === "50d") {
      document.getElementById("#descIm").src = "images/014-haze.svg";
    } else if (icon === "50n") {
      document.getElementById("#descIm").src = "images/037-foggy.svg";
    }
  }
  axios.get(apiUrl).then(iconW);
}
// get the Wind & Humidity of a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", changeIcon);
// get the Wind & Humidity of a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", changeIcon);
