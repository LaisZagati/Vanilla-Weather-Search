


function handleSearchSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  let searchInput = document.querySelector("#search-form-input"); // Get the user input
  let cityElement = document.querySelector("#city"); // Target the city element from html using ID}
  cityElement.innerHTML = searchInput.value; // Update h1 city name to user input value
}

let searchFormElement = document.querySelector("#search-form"); // Target form element from html using ID
searchFormElement.addEventListener("submit", handleSearchSubmit); // Add event listener to the form when submit is clicked