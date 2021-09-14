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

// date => 5/August/2021 | 22:54
document.querySelector("#dateToday").innerHTML = `${dateNow.getDate()} ${
  months[month]
},${dateNow.getFullYear()} | ${dateNow.getHours()}:${minNow}`;
// day => Sunday
document.querySelector("#dayToday").innerHTML = `${days[day]}`;

// --- Search a city ---
function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar");
  document.querySelector("h2").innerHTML = city.value;
}
// search a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", getCity);
// search a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", getCity);

// --- Temperature ---
// capitalize a word
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// get the temperature
function getCityTemp(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  console.log(cityName);

  let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    console.log(`${tempNow}°C`);
    let description = response.data.weather[0].description;
    console.log(description);
    document.querySelector("h1").innerHTML = `${tempNow}°C`;
    document.querySelector("#description").innerHTML = `${description}`;
  }

  axios.get(apiUrl).then(weather);
}
// get the temperature of a city when submitting in the form
document.querySelector("#searchForm").addEventListener("submit", getCityTemp);
// get the temperature of a city when clicking on 🔍
document.querySelector("#lens").addEventListener("click", getCityTemp);

// Transform °C to °F
function change2celcius(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    document.querySelector("h1").innerHTML = `${tempNow}°C`;
  }

  axios.get(apiUrl).then(weather);
}
document.querySelector("#C").addEventListener("click", change2celcius);
// transfotm °F to °C
function change2fahrenheit(event) {
  event.preventDefault();
  let cityName = capitalize(document.querySelector("#searchBar").value);
  let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  function weather(response) {
    let tempNow = Math.round(response.data.main.temp);
    let tempNowF = Math.round((tempNow * 9) / 5) + 32;
    document.querySelector("h1").innerHTML = `${tempNowF}°F`;
  }

  axios.get(apiUrl).then(weather);
}
document.querySelector("#F").addEventListener("click", change2fahrenheit);

// ---Current position temperature---
function currentPos(event) {
  event.preventDefault();
  function weather(response) {
    //console.log(response);
    let tempNow = Math.round(response.data.main.temp);
    //let tempNowF = Math.round((tempNow * 9) / 5) + 32;
    document.querySelector("h1").innerHTML = `${tempNow}°C`;
    //document.querySelector("h1").innerHTML = `${tempNowF}°F`;
    let changeH1 = document.querySelector("h2");
    changeH1.innerHTML = `${response.data.name} `;
  }
  function currentTemp(position) {
    let apiKey = `0f228e3e7aa18774ac951c893270d5e1`;
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let units = `metric`;
    let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

    axios.get(urlCoords).then(weather);
  }

  navigator.geolocation.getCurrentPosition(currentTemp);
}
document.querySelector("#current").addEventListener("click", currentPos);
