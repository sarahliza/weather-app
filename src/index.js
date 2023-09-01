//week 4 - In your project, display the current date and time using JavaScript: Tuesday 16:00

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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

let time = document.querySelector("#live-time");
time.innerHTML = formatDate(new Date());

//week 4 - Add a search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//week 5 - when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
//week 5 - Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showWeatherData(response) {
  //console.log(response);

  document.querySelector(
    "#city-output"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description[0].toUpperCase() +
    response.data.weather[0].description.slice(1);
}

function searchCity(city) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherData);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationSearch = document.querySelector("#pin-location");
locationSearch.addEventListener("click", searchLocation);

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", handleSubmit);

searchCity("Sydney");

//week 4 - Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureOutput = document.querySelector("#temperature");
  temperatureOutput.innerHTML = 17;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureOutput = document.querySelector("#temperature");
  temperatureOutput.innerHTML = 63;
}

let showCelsius = document.querySelector("#cels");
showCelsius.addEventListener("click", changeToCelsius);

let showFahrenheit = document.querySelector("#fahr");
showFahrenheit.addEventListener("click", changeToFahrenheit);
