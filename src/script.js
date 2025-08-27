function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city"); // Target the city element from html using ID}
  let descriptionElement = document.querySelector("#description"); // Target the description element from html using ID
  let humidityElement = document.querySelector("#humidity"); // Target the humidity element from html using ID
  let windElement = document.querySelector("#wind-speed"); // Target the wind element from html using ID
  let timeElement = document.querySelector("#time"); // Target the time element from html using ID
  let date = new Date(response.data.time * 1000); // Convert the time from seconds to milliseconds
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  cityElement.innerHTML = response.data.city; // Update h1 city name to API result
  descriptionElement.innerHTML = response.data.condition.description; // Update description to API result
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`; // Update description to API result
  windElement.innerHTML = `${response.data.wind.speed} km/h`; // Update description to API result
  timeElement.innerHTML = formatDate(date); // Update HTML with current city with the current time calling formatDate function
  temperatureElement.innerHTML = Math.round(temperature); // Update HTML with current city with the current temperature
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;


  getForecast(response.data.city);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //Make an API call to get the weather data for the city
  let apiKey = "f093ocaff400a6043tff45112437b840";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  let searchInput = document.querySelector("#search-form-input"); // Get the user input

  searchCity(searchInput.value); // Call the function to search for the city
}

function getForecast(city) {
  let apiKey = "f093ocaff400a6043tff45112437b840"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form"); // Target form element from html using ID
searchFormElement.addEventListener("submit", handleSearchSubmit); // Add event listener to the form when submit is clicked

searchCity("Paris"); // Initial call to load weather data for Paris
