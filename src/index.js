//week 4 - In your project, display the current date and time using JavaScript: Tuesday 16:00

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay} ${currentHour}:${currentMinute}`;
}

function showWeatherData(response) {
  console.log(response);

  celsiusTemperature = response.data.temperature.current;
  showFahrenheit.classList.remove("active");
  showCelsius.classList.add("active");

  document.querySelector("#city-output").innerHTML = response.data.city;

  document.querySelector("#country-output").innerHTML = response.data.country;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function searchCity(city) {
  let apiKey = "a46b04tcc0o38a3fad3e90b0cb70d454";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherData);
  //console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a46b04tcc0o38a3fad3e90b0cb70d454";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);

  axios.get(apiUrl).then(showWeatherData);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureOutput = document.querySelector("#temperature");
  temperatureOutput.innerHTML = Math.round(celsiusTemperature);
  showFahrenheit.classList.remove("active");
  showCelsius.classList.add("active");
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureOutput = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureOutput.innerHTML = Math.round(fahrenheitTemp);
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
}

let celsiusTemperature = null;

let time = document.querySelector("#live-time");
time.innerHTML = formatDate(new Date());

let locationSearch = document.querySelector("#pin-location");
locationSearch.addEventListener("click", searchLocation);

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", handleSubmit);

let showCelsius = document.querySelector("#cels");
showCelsius.addEventListener("click", changeToCelsius);

let showFahrenheit = document.querySelector("#fahr");
showFahrenheit.addEventListener("click", changeToFahrenheit);

searchCity("Sydney");
