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


// 6 day forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayWeatherForecast(response) {
  let forecast = response.data.daily;

  let weatherForecastElement = document.querySelector("#weather-forecast");

  let weatherForecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weatherForecastHTML = weatherForecastHTML +
        `<div class = "col-2">
          <ul class = "list-group list-group-flush">
            <li class = "list-group-item"> ${formatDay(forecastDay.time)}</li> 
            <li class = "list-group-item">
            <img src = "${forecastDay.condition.icon_url}"
            width = "45px"/>
            </li>  
            <li class = "list-group-item">
           <span id = "max-temp"> ${Math.round(forecastDay.temperature.maximum)}° </span>
          /<span id = "min-temp">${Math.round(forecastDay.temperature.minimum)}° </span> </li>
          </ul>  
        </div>`;
    }
  });

  weatherForecastHTML = weatherForecastHTML + ` </div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}


// Search Engine

function getForecast(coordinates) {
  let apiKey = "ebb9dt4f3c1fda5064cb77ffeebaaf7o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayWeather(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let currentDescription = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  // celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);

  getForecast(response.data.coordinates);
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

  let apiKey = "ebb9dt4f3c1fda5064cb77ffeebaaf7o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}


function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let currentTempElement = document.querySelector("#current-temp");

//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   currentTempElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   let currentTempElement = document.querySelector("#current-temp");

//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   currentTempElement.innerHTML = Math.round(celsiusTemperature);
// }

let enterCity = document.querySelector("#input-city");
enterCity.addEventListener("submit", showCity);

let currentButton = document.querySelector("#showPosition");
currentButton.addEventListener("click", getCurrentLocation);

// let celsiusTemperature = null;

let form = document.querySelector("#input-city");
form.addEventListener("submit", handleSubmit);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity();