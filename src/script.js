function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city"); // Target the city element from html using ID}

  cityElement.innerHTML = response.data.city; // Update h1 city name to API result
  temperatureElement.innerHTML = Math.round(temperature); // Update HTML with current city with the current temperature
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

let searchFormElement = document.querySelector("#search-form"); // Target form element from html using ID
searchFormElement.addEventListener("submit", handleSearchSubmit); // Add event listener to the form when submit is clicked


searchCity("Paris"); // Initial call to load weather data for Paris