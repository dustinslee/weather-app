/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/city.js":
/*!*********************!*\
  !*** ./src/city.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"City\": () => (/* binding */ City)\n/* harmony export */ });\nclass City {\n  constructor(id, locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, windSpeed, description, time , lat, lon) {\n    this.id = id;\n    this.locId = locId;\n    this.name = name;\n    this.state = state;\n    this.country = country;\n    this.feelsLike = feelsLike;\n    this.humidity = humidity;\n    this.temp = temp;\n    this.hiTemp = hiTemp;\n    this.loTemp = loTemp;\n    this.windSpeed = windSpeed;\n    this.desc = description;\n    this.time = time;\n    this.lat = lat;\n    this.long = lon;\n  }\n}\n\n\n//# sourceURL=webpack://weather-app/./src/city.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _locationList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locationList */ \"./src/locationList.js\");\n\n\nconst apiKey = \"8c4cd8934fb14be08db82e4972385714\";\nconst searchInput = document.getElementById(\"search\");\nconst searchBtn = document.getElementById(\"submitSearch\");\nconst search = document.getElementById(\"search\");\nconst locationEle = document.getElementById(\"location\");\nconst descripEle = document.getElementById(\"descrip\");\nconst feelsLikeEle = document.getElementById(\"feels-like\");\nconst humidityEle = document.getElementById(\"humidity\");\nconst windSpeedEle = document.getElementById(\"wind-speed\");\nconst removeBtn = document.querySelector(\".removeBtn\");\nlet locGeo;\n\nconst locationList = new _locationList__WEBPACK_IMPORTED_MODULE_0__.LocationList();\n\nfunction getWeather(e) {\n  e.preventDefault();\n  if(!searchInput.value) {\n    return false;\n  }\n\n  const searchQuery = searchInput.value.split(/[ ,]+/);\n  const cityName = searchQuery[0];\n  /*\n    API accepts state names/codes for country code but not vice versa.\n    e.g. New York City, New York\n    Country code of \"New York\" will still return the proper values.\n    However if a country is given for a state code it may or may not work.\n    e.g. Seoul, Korea. With Korea given as the state code will not work.\n    But Paris, France will work.\n    Until logic is built out it is better to priortize country over state.\n  */\n  const countryCode = searchQuery.length > 1 ? searchQuery[1] : \"\";\n  const stateCode = searchQuery.length > 2 ? searchQuery[2] : \"\";\n  const limit = 1;\n  const locAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;\n  fetch(locAPI, {mode: \"cors\"})\n  .then((res) => res.json())\n  .then((data) => {\n    //TO-DO - Elastic Search - instead of limiting to first result\n    locGeo = data[0];\n    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locGeo.lat}&lon=${locGeo.lon}&units=imperial&appid=${apiKey}`);\n  })\n  .then((res) => res.json())\n  .then((data) => {\n    addLocation(data);\n  })\n  .catch((error) => console.error('Request failed', error));\n}\n\nfunction addLocation(loc) {\n  // Check if location exists by location id received from API\n  const locExists = locationList.recent.some(e => e.locId == loc.id);\n  // If location does NOT exist continue to add to list and update dom\n  if(!locExists) {\n    const {id, dt, main: {feels_like, humidity, temp, temp_max, temp_min}, wind: { speed }, weather  } = loc;\n    locationList.addToRecent(\n      id, locGeo.name, locGeo.state, locGeo.country, feels_like, humidity, temp, temp_max, temp_min, speed, weather, \n      dt, locGeo.lat, locGeo.lon\n    );\n    updateDom();\n  } else {\n    // TO-DO: Style DOM to let user know location already exists\n    console.error(\"Location already exists\");\n  }\n\n  // Reset search input\n  searchInput.value = \"\";\n}\n\nfunction updateDom() {\n  // Remove old element/list\n  locationEle.replaceChildren();\n  // Create/Update with new information\n  locationList.recent.forEach((loc) => {\n    const state = loc.state ? loc.state : \"\";\n    const country = loc.country ? loc.country : \"\";\n    const subLocation = state ? state + \" \" + country : country;\n\n    const locWrapper = document.createElement(\"li\");\n    const locDetails = document.createElement(\"p\");\n    locDetails.id = \"loc-row1-container\";\n    const locName = document.createElement(\"span\");\n    locName.id = \"loc-name\";\n    locName.textContent = `${loc.name}, ${subLocation}`;\n\n    const currentTemp = document.createElement(\"span\");\n    currentTemp.id = \"current-temp\";\n    currentTemp.textContent = `Current Temp: ${loc.temp}` + \"\\xB0\";\n\n    const locDetails2 = document.createElement(\"p\");\n    locDetails2.id = \"loc-row2-container\";\n    const locTime = document.createElement(\"span\");\n    locTime.id = \"loc-time\";\n    const lastUpdated = new Date(loc.time*1000).toLocaleTimeString();\n    locTime.textContent = `Last Updated: ${lastUpdated}`;\n    const hiLoTemp = document.createElement(\"span\");\n    hiLoTemp.id = \"hi-lo-temp\";\n    hiLoTemp.textContent = `H: ${loc.hiTemp}` + \"\\xB0\" + \"  \" + `L:${loc.loTemp}` + \"\\xB0\";\n\n    // Allows user to click on a location and show its weather details\n    locWrapper.addEventListener(\"click\", () => showWeatherDetails(loc));\n\n    locDetails.appendChild(locName);\n    locDetails.appendChild(currentTemp);\n    locDetails2.appendChild(locTime);\n    locDetails2.appendChild(hiLoTemp);\n    locWrapper.appendChild(locDetails);\n    locWrapper.appendChild(locDetails2);\n    locationEle.appendChild(locWrapper);\n  })\n}\n\nfunction showWeatherDetails(loc) {\n  descripEle.textContent = `Description: ${loc.desc}`;\n  feelsLikeEle.textContent = `Feels Like: ${loc.feelsLike}` + \"\\u2109\";\n  humidityEle.textContent = `Humidity: ${loc.humidity}%`;\n  windSpeedEle.textContent = `Wind Speed: ${loc.windSpeed} mph`;\n  // Enable remove button\n  removeBtn.disabled = false;\n  removeBtn.style.cursor = \"cursor\";\n  removeBtn.cursor = \"pointer\";\n  removeBtn.setAttribute(\"data-carId\", loc.id);\n}\n\nfunction removeLocation() {\n  // Get location id\n  let locId = Number(removeBtn.getAttribute(\"data-carId\"));\n  // Remove location from list\n  locationList.remove(locId);\n\n  //Rebuild with new list\n  updateDom();\n\n  // Clear weather details and disable remove button\n  descripEle.textContent = \"\";\n  feelsLikeEle.textContent = \"\";\n  humidityEle.textContent = \"\";\n  windSpeedEle.textContent = \"\";\n  removeBtn.disabled = true;\n  removeBtn.style.cursor = \"not-allowed\";\n  removeBtn.cursor = \"not-allowed !important\";\n}\n\nsearchBtn.addEventListener(\"click\", getWeather);\n// Allow user to search by hitting enter/return key\nsearch.addEventListener(\"onkeydown\", (e) => {\n  if(e.keyCode == 13) getWeather;\n});\nremoveBtn.addEventListener(\"click\", removeLocation);\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/locationList.js":
/*!*****************************!*\
  !*** ./src/locationList.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LocationList\": () => (/* binding */ LocationList)\n/* harmony export */ });\n/* harmony import */ var _city__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city */ \"./src/city.js\");\n\n\nclass LocationList {\n  constructor() {\n    this.recent = [];\n    this.nextId = 0;\n  }\n  \n  addToRecent(locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, speed, weather, time, lat, lon) {\n    const city = new _city__WEBPACK_IMPORTED_MODULE_0__.City(\n      ++this.nextId, locId, name, state, country, feelsLike, humidity, temp, hiTemp, loTemp, speed, weather[0].description, \n      time, lat, lon\n    );\n    this.recent.push(city);\n  }\n\n  remove(locId) {\n    this.recent = this.recent.filter(loc => loc.id != locId);\n  }\n}\n\n//# sourceURL=webpack://weather-app/./src/locationList.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;