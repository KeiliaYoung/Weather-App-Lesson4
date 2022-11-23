function searchCity(cityInput) {
    let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
    `;
  axios.get(apiUrl).then(displayWeather)`;
}