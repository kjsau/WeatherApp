function search(city) {
  let apiKey = "bd76e2bc6232f106529f184cc0d9a95d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h2 = document.querySelector("#city");
  h2.innerHTML = `${searchInput.value}`;
  let city = `${searchInput.value}`;
  search(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 4) {
      forecastHTML =
        forecastHTML +
        `   <div class="todayWeather">
            <div class="row">
              <div class="col-3">
                <h3>${formatDay(forecastDay.dt)}</h3>
              </div>
              <div class="col-3">
                <img src= "http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"/>
              </div>
              <div class="col-2">
                <h3>${Math.round(forecastDay.temp.max)}°C</h3>
              </div>
              <div class="col-4">
                <h3>${forecastDay.weather[0].main}</h3>
                </div>
                </div>
                </div>
                <br/>
  
  `;
    }
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bd76e2bc6232f106529f184cc0d9a95d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let weatherElement = document.querySelector("#weatherDescription");
  weatherElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

let now = new Date();
let h2 = document.querySelector("#date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Feburary",
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
let month = [now.getMonth()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

let form = document.querySelector("#citySearch");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bd76e2bc6232f106529f184cc0d9a95d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
