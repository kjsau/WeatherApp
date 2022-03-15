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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   <div class="todayWeather">
            <div class="row">
              <div class="col-3">
                <h3>${day}</h3>
              </div>
              <div class="col-3">
                <img id="sun" src="images/sun.png" width="60px" />
              </div>
              <div class="col-2">
                <h3 id="currentTemp"></h3>
              </div>
              <div class="col-4">
                <h3>weather description</h3>
                </div>
                </div>
                </div>
                <br/>
  
  `;
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
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
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

displayForecast();

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bd76e2bc6232f106529f184cc0d9a95d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
