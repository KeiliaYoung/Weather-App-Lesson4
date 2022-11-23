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
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML =
        Math.round(response.data.main.temp) + "°C";

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
}

function searchCity(city) {
    let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function showCity(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search-input").value;
    searchCity(city);
}

function showPosition(position) {
    let apiKey = "16e9550d3526f189d453e6d36a97331c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
}

function getCurrentLocation(event) {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let enterCity = document.querySelector("#input-city");
enterCity.addEventListener("submit", showCity);

let currentButton = document.querySelector("#showPosition");
currentButton.addEventListener("click", getCurrentLocation);

// F / C
function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-search-input");
    let h1 = document.querySelector("h1");
    h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#input-city");
form.addEventListener("submit", search);

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