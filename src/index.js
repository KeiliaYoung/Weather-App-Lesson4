// Date/Time

let now = new Date();
let h3 = document.querySelector("#todays-date");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minutes}`;

// Search Engine

function displayWeather(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");


  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);

}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "ebb9dt4f3c1fda5064cb77ffeebaaf7o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "28483fb0bac69b11e99890f72d1b1c8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let enterCity = document.querySelector("#input-city");
enterCity.addEventListener("submit", showCity);

let currentButton = document.querySelector("#showPosition");
currentButton.addEventListener("click", getCurrentLocation);

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}

let form = document.querySelector("#input-city");
form.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentCelsiusTemperature = document.querySelector("#celsius");
  currentCelsiusTemperature.innerHTML = "67°C";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentCelsiusTemperature = document.querySelector("#fahrenheit");
  currentCelsiusTemperature.innerHTML = "19°F";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);