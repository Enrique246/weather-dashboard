// Variable identification

let savedCities = [];
let townFormEl = document.querySelector("#search-form");
let townTitleEl = document.querySelector("#search-input");
let wContainerEl = document.querySelector("#selected-weather-box");
let townSearchInputEl = document.querySelector("#current-city");
let especulationTitle = document.querySelector("#especulation");
let fiveDayBox = document.querySelector("#five-box");
let pSearchEl = document.querySelector("#p-search-b");

// console.log ("hello");
//Fetch API
// API key : a9e17a63f8c99240e7dabe900a8ce415
let goTownWeather = function (town) {
  
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
  let presentDate = document.createElement("span");
  presentDate.textContent = (
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ")");
  townSearchInputEl.appendChild (presentDate);

  //Weather Icon

  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    townSearchInputEl.appendChild (weatherIcon)
  // Temperature
  let tempEl = document.createElement("span");
  tempEl.textContent= "Temperature: " + weather.main.temp + " ºF";
  tempEl.classList = "list-group-item";

  //"list-group-item"
  // https://getbootstrap.com/docs/5.0/components/list-group/

  //Humidity
  let humEl = document.createElement("span");
  humEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humEl.classList = "list-group-item";

  //Wind
  let windEl = document.createElement("span");
  windEl.textContent = "Wind speed: " + weather.wind.speed + " MPH";
  windEl.classList = "list-group-item";

  //Appending to box
  wContainerEl.appendChild(tempEl);
  wContainerEl.appendChild(humEl);
  wContainerEl.appendChild(windEl);

let latitud = weather.coord.lat;
let long = weather.coord.lon;

goUV(latitud,long);
};

let goUV = function (latitud,long) {
    fetch(
        `https://api.openweathermap.org/data/2.5/uvi?appid=a9e17a63f8c99240e7dabe900a8ce415&lat=${latitud}&lon=${long}`
      )
// console.log(goUV)
        .then(function (response) {
          //console.log(response);
          return response.json();
        })
        .then(function (data) {
         
            dUvIndex(data);
             //console.log(data);
        });
    }
let dUvIndex = function (base) {
   console.log(base) 
    let uvBaseEl = document.createElement("div");
    uvBaseEl.textContent = "Ultra-Violet Index : ";
    uvBaseEl.classList = "list-group-item";

    uvBaseValue = document.createElement("span");
    uvBaseValue.textContent = base.value;

    if (base.value <= 3) {
        uvBaseValue.classList = "favorable";
    } else if (base.value > 3 && base.value <= 7){
        uvBaseValue.classList = "moderate"
    }

    else if (base.value > 8) {
        uvBaseValue.classList = "severe"

    };

    uvBaseEl.appendChild(uvBaseValue);

    wContainerEl.appendChild(uvBaseEl);

}; 

// 5-day boxes



// Search button handler
// Trim: removes whitespace form both ends of a string

let searchHandler = function (event) {
    console.log("click");
    event.preventDefault();
  
    let town = townTitleEl.value.trim();
    console.log(town);
    if (town) {
      goTownWeather(town);
    //    go5Days(town);
    //    savedCities.unshift({town});
    //   townTitleEl.value = "";
    // } else {
    //     alert ("Enter a City");
    // }
    // sSearch();
    // pSearch();
  };
}
  
townFormEl.addEventListener("click", searchHandler);

