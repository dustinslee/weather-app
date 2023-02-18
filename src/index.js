import { LocationList } from './locationList';

const apiKey = "8c4cd8934fb14be08db82e4972385714";
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("submitSearch");
const search = document.getElementById("search");
const locationEle = document.getElementById("location");
const descripEle = document.getElementById("descrip");
const feelsLikeEle = document.getElementById("feels-like");
const humidityEle = document.getElementById("humidity");
const windSpeedEle = document.getElementById("wind-speed");
const removeBtn = document.querySelector(".removeBtn");
let locGeo;

const locationList = new LocationList();

function getWeather(e) {
  e.preventDefault();
  if(!searchInput.value) {
    return false;
  }

  const searchQuery = searchInput.value.split(/[ ,]+/);
  const cityName = searchQuery[0];
  /*
    API accepts state names/codes for country code but not vice versa.
    e.g. New York City, New York
    Country code of "New York" will still return the proper values.
    However if a country is given for a state code it may or may not work.
    e.g. Seoul, Korea. With Korea given as the state code will not work.
    But Paris, France will work.
    Until logic is built out it is better to priortize country over state.
  */
  const countryCode = searchQuery.length > 1 ? searchQuery[1] : "";
  const stateCode = searchQuery.length > 2 ? searchQuery[2] : "";
  const limit = 1;
  const locAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;
  fetch(locAPI, {mode: "cors"})
  .then((res) => res.json())
  .then((data) => {
    //TO-DO - Elastic Search - instead of limiting to first result
    locGeo = data[0];
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locGeo.lat}&lon=${locGeo.lon}&units=imperial&appid=${apiKey}`);
  })
  .then((res) => res.json())
  .then((data) => {
    addLocation(data);
  })
  .catch((error) => console.error('Request failed', error));
}

function addLocation(loc) {
  // Check if location exists by location id received from API
  const locExists = locationList.recent.some(e => e.locId == loc.id);
  // If location does NOT exist continue to add to list and update dom
  if(!locExists) {
    const {id, dt, main: {feels_like, humidity, temp, temp_max, temp_min}, wind: { speed }, weather  } = loc;
    locationList.addToRecent(
      id, locGeo.name, locGeo.state, locGeo.country, feels_like, humidity, temp, temp_max, temp_min, speed, weather, 
      dt, locGeo.lat, locGeo.lon
    );
    updateDom();
  } else {
    // TO-DO: Style DOM to let user know location already exists
    console.error("Location already exists");
  }

  // Reset search input
  searchInput.value = "";
}

function updateDom() {
  // Remove old element/list
  locationEle.replaceChildren();
  // Create/Update with new information
  locationList.recent.forEach((loc) => {
    const state = loc.state ? loc.state : "";
    const country = loc.country ? loc.country : "";
    const subLocation = state ? state + " " + country : country;

    const locWrapper = document.createElement("li");
    const locDetails = document.createElement("p");
    locDetails.id = "loc-row1-container";
    const locName = document.createElement("span");
    locName.id = "loc-name";
    locName.textContent = `${loc.name}, ${subLocation}`;

    const currentTemp = document.createElement("span");
    currentTemp.id = "current-temp";
    currentTemp.textContent = `Current Temp: ${loc.temp}` + "\xB0";

    const locDetails2 = document.createElement("p");
    locDetails2.id = "loc-row2-container";
    const locTime = document.createElement("span");
    locTime.id = "loc-time";
    const lastUpdated = new Date(loc.time*1000).toLocaleTimeString();
    locTime.textContent = `Last Updated: ${lastUpdated}`;
    const hiLoTemp = document.createElement("span");
    hiLoTemp.id = "hi-lo-temp";
    hiLoTemp.textContent = `H: ${loc.hiTemp}` + "\xB0" + "  " + `L:${loc.loTemp}` + "\xB0";

    // Allows user to click on a location and show its weather details
    locWrapper.addEventListener("click", () => showWeatherDetails(loc));

    locDetails.appendChild(locName);
    locDetails.appendChild(currentTemp);
    locDetails2.appendChild(locTime);
    locDetails2.appendChild(hiLoTemp);
    locWrapper.appendChild(locDetails);
    locWrapper.appendChild(locDetails2);
    locationEle.appendChild(locWrapper);
  })
}

function showWeatherDetails(loc) {
  descripEle.textContent = `Description: ${loc.desc}`;
  feelsLikeEle.textContent = `Feels Like: ${loc.feelsLike}` + "\u2109";
  humidityEle.textContent = `Humidity: ${loc.humidity}%`;
  windSpeedEle.textContent = `Wind Speed: ${loc.windSpeed} mph`;
  // Enable remove button
  removeBtn.disabled = false;
  removeBtn.style.cursor = "cursor";
  removeBtn.cursor = "pointer";
  removeBtn.setAttribute("data-carId", loc.id);
}

function removeLocation() {
  // Get location id
  let locId = Number(removeBtn.getAttribute("data-carId"));
  // Remove location from list
  locationList.remove(locId);

  //Rebuild with new list
  updateDom();

  // Clear weather details and disable remove button
  descripEle.textContent = "";
  feelsLikeEle.textContent = "";
  humidityEle.textContent = "";
  windSpeedEle.textContent = "";
  removeBtn.disabled = true;
  removeBtn.style.cursor = "not-allowed";
  removeBtn.cursor = "not-allowed !important";
}

searchBtn.addEventListener("click", getWeather);
// Allow user to search by hitting enter/return key
search.addEventListener("onkeydown", (e) => {
  if(e.keyCode == 13) getWeather;
});
removeBtn.addEventListener("click", removeLocation);