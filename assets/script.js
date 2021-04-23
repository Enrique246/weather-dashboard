// Variable identification

let savedCities = [];
let townFormEl = $("#search-form");
let townTitleEl = $("#search-input");
let wContainerEl = $("#selected-weather-box");
let townSearchInputEl = $("#current-city");
let especulationTitle = $("#especulation");
let fiveDayBox = $("#5-box");
let pSearchEl = $("#p-search-b");

//Fetch API
// API key : a9e17a63f8c99240e7dabe900a8ce415
let goTownWeather = function (town) {
  console.log("goTownWeather");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=imperial&appid=a9e17a63f8c99240e7dabe900a8ce415`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dWeather(data, town);
    });
};

let sSearch = function () {
  localStorage.setitem("savedCities", JSON.stringify(savedCities));
};

//Clean older content
let dWeather = function (weather, sCity) {
  wContainerEl.textContent = "";
  townSearchInputEl.textContent = sCity;

  console.log(weather);
  console.log(sCity);

  // Date
  let presentDate = $("<span/>");
  presentDate.textContent =
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ")";
  townSearchInputEl.append(presentDate);

  //Weather Icon

  let weatherIcon = $("<img/>");
  weatherIcon.attr("src", "");

  // Temperature
  let tempEl = $("<span/>");
  tempEl.text ("Temperature: " + weather.main.temp + " ºF");
  tempEl.addClass ("data-list");

  //Humidity
  let humEl = $("<span/>");
  tempEl.text ("Humidity: " + weather.main.humidity + " %");
  tempEl.addClass ("data-list");

  //Wind
  let windEl = $("<span/>");
  tempEl.text ("Wind speed: " + weather.wind.speed + " MPH");
  tempEl.addClass ("data-list");

  //Appending to box
  wContainerEl.append(tempEl);
  wContainerEl.append(humEl);
  wContainerEl.append(windEl);
};
// Search button handler
// Trim: removes whitespace form both ends of a string

let searchHandler = function (event) {
  console.log("submit");
  event.preventDefault();

  let town = townTitleEl.val().trim();
  console.log(town);
  if (town) {
    goTownWeather(town);
  }
};

townFormEl.on("submit", searchHandler);

// var formSumbitHandler = function(event){
//     event.preventDefault();
//     var city = cityInputEl.value.trim();
//     if(city){
//         getCityWeather(city);
//         get5Day(city);
//         cities.unshift({city});
//         cityInputEl.value = "";
//     } else{
//         alert("Please enter a City");
//     }
//     saveSearch();
//     pastSearch(city);
// }
