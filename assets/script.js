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
    console.log("goTownWeather")
fetch ('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${a9e17a63f8c99240e7dabe900a8ce415}')
.then (function (response){
    response.json()
})
.then(function(data){
        dWeather (data, town);
    });

};

let sSearch = function (){
    localStorage.setitem("savedCities", JSON.stringify(savedCities));
}

//Clean older content
let dWeather = function (weather, sCity){
    wContainerEl.textContent="";
    townSearchInputEl.textContent=sCity;

    console.log (weather);
    console.log (sCity);

// Date
let presentDate = $("<span/>")
presentDate.textContent= " (" + moment(weather.dt.value).format("MMM D, YYYY") + ")";
townSearchInputEl.appendChild(presentDate);


//Weather Icon

let weatherIcon = $("<img/>");
weatherIcon.setAttr(src = "")

// Temperature
let tempEl = $("<span/>")
tempEl.textContent = "Temperature: " + weather.main.temp + " ºF";
tempEl.classList = "data-list";

//Humidity
let humEl = $("<span/>")
tempEl.textContent = "Humidity: " + weather.main.humidity + " %";
tempEl.classList = "data-list";

//Wind
let windEl = $("<span/>")
tempEl.textContent = "Wind speed: " + weather.wind.speed + " MPH";
tempEl.classList = "data-list";

//Appending to box
wContainerEl.appendChild (tempEl);
wContainerEl.appendChild (humEl);
wContainerEl.appendChild (windEl);


}
// Search button handler
// Trim: removes whitespace form both ends of a string

let searchHandler = function (event) {
    event.preventDefault();
    let town = townFormEl.value.trim();
    if (town){

    };
};



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