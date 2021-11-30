// Initially planned on taking users current location, ran into issue with API, but keeping here to be implemented later
let longitude = 42.3601;
let latitude = 71.0589;
let city = "Boston, MA";
var slideIndex = 1;
// All articles are put into arrays so they are easily navigatable in slideshow with for lops
const tops = [
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShortsleeve-1.png?v=1636412917404",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShortsleeve-2.png?v=1636412931679",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShortsleeve-3.png?v=1636412938194"
];
const warmTops = [
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FLongsleeve-1.png?v=1636412943807",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FLongsleeve-2.png?v=1636412948310",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FLongsleeve-3.png?v=1636412953615"
];
const shorts = [
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShorts-1.png?v=1636412959546",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShorts-2.png?v=1636412962804",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FShorts-3.png?v=1636412965866"
];
const pants = [
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FPants-1.png?v=1636412969142",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FPants-2.png?v=1636412971792",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FPants-3.png?v=1636412974620"
];
const accessories = [
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FHat-1.png?v=1636412977266",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FHat-2.png?v=1636412979521",
  "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2FUntitled.png?v=1636512415536"
];

// Creates the div with layout for letter, but information is populated in async function
function makeDayWeather() {
  let dayWrapper = document.createElement("div");

  let day = document.createElement("button");
  day.classList.add("day-weather");

  let dayBody = document.createElement("div");
  dayBody.classList.add("content");

  dayWrapper.append(day);
  dayWrapper.append(dayBody);

  document.getElementById("weatherItems").appendChild(dayWrapper);
}

// Same deal as day weather, information is populated in async function
function makeHourWeather() {
  let dayWrapper = document.createElement("div");
  let day = document.createElement("div");
  day.classList.add("hour-weather");
  dayWrapper.append(day);
  document.querySelector(".hourly-weather-wrapper").appendChild(dayWrapper);
}

// Hiding all expanded portion except for the one that was just clicked, which makes it so only one can be expanded at a time
function expand(id) {
  let days = document.getElementsByClassName("day-weather");
  for (let day in days) {
    if (day != id) {
      // None hides div
      days[day].setAttribute("style", "display: none;");
    } else {
      // inline just makes it visible
      days[day].setAttribute("style", "display: inline;");
    }
  }
}

// From first comment, this wasn't ever implemented, was going to use geolocation for weather, but leaving in case implemented later
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      longitude = position.coords.latitude;
      latitude = position.coords.longitude;
      city = `(${latitude}, ${longitude})`;
      var loc = document.querySelector("#location");
      loc.append(`${city}`);
    },
    function(error) {
      console.log("The Locator was denied. :(");
    }
  );
}

// Retreive hourly forecast, inputs aren't actually used, but left in case geolocation wants to be later implemented as mentioned in previous function
// API key here and everywhere else is a personal key
async function getHourlyForecast(
  lati = 42.3329882,
  long = -71.1052938,
  apiKey = "337afdebcc388b85fbf9a9545db32f33"
) {
  //   The api that we use
  let metadataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&units=imperial&appid=${apiKey}`;
  // wait here until the response comes back
  const metadataResponse = await fetch(metadataUrl);
  // now wait until we can get the JSON version of it - a Javascript object!
  const metadata = await metadataResponse.json();
  // go in and find out which server to ask for the weather of this place
  let hourlyTemps = document.querySelectorAll(".hour-weather");
  // Hourly has weather every 30 min, but we want every hour, so we add 2 to get each on the hour
  let hourlyCounter = 0;
  //     this is done so that we are getting the hourly temps for every hour that is available, day is used to represent the hourly temperatures
  for (let day = 0; day < hourlyTemps.length; day++) {
    //     The rest of this function is pretty intuitive, just creating elements and updating them based on the hourly weather
    hourlyCounter += 2;
    let time = document.createElement("div");
    let degree = document.createElement("sup");
    let hourlyWrapper = document.createElement("div");
    degree.append("o");
    time.classList.add("time");
    time.append(`${day}:00`);
    hourlyTemps[day].append(time);
    hourlyWrapper.append(metadata.hourly[day].temp);
    hourlyWrapper.append(degree);
    hourlyWrapper.append("F");
    let hourlyImage = document.createElement("img");
    hourlyImage.src = getWeatherIcon(metadata.hourly[day].weather[0].main);
    hourlyImage.classList.add("hourly-image");
    hourlyTemps[day].append(hourlyWrapper);
    hourlyTemps[day].append(hourlyImage);
  }
}

// Same function as the hourly, but to update the divs with the daily temperature, so updates date, high, low, image, humidity, uvi, and windspeed
// API key here and everywhere else is a personal key
async function getForecast(
  lati = 42.3329882,
  long = -71.1052938,
  apiKey = "337afdebcc388b85fbf9a9545db32f33"
) {
  //     api
  //     same as hourly temp function, calling api to get daily temperatures
  let metadataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&units=imperial&appid=${apiKey}`;
  // wait here until the response comes back
  const metadataResponse = await fetch(metadataUrl);
  // now wait until we can get the JSON version of it - a Javascript object!
  const metadata = await metadataResponse.json();
  console.log(metadata);
  // go in and find out which server to ask for the weather of this place
  let dailyTemps = document.querySelectorAll(".day-weather");
  let dailyTempsBody = document.querySelectorAll(".content");
  //     this is intuitive, just filling divs that exist with the daily temperature
  for (let day = 0; day < dailyTemps.length; day++) {
    let highlow = document.createElement("div");
    highlow.classList.add("high-low-wrap");
    let dayWrapper = document.createElement("div");
    dayWrapper.classList.add("day-weather-wrap");

    // Issues reusing degree element, so had to make 2 versions
    let degree = document.createElement("sup");
    degree.append("o");
    let d = document.createElement("sup");
    d.append("o");
    let low = document.createElement("div");
    let lowWrapper = document.createElement("div");
    lowWrapper.classList.add("flex-wrap");
    lowWrapper.append(`low: ${metadata.daily[day].temp.min}`);
    lowWrapper.append(degree);
    lowWrapper.append("F");
    highlow.append(lowWrapper);

    let high = document.createElement("div");
    let highWrapper = document.createElement("div");
    highWrapper.classList.add("flex-wrap");
    highWrapper.append(`high: ${metadata.daily[day].temp.max}`);
    highWrapper.append(d);
    highWrapper.append("F");
    highlow.append(highWrapper);

    let dayImg = document.createElement("img");
    dayImg.src = getWeatherIcon(metadata.daily[day].weather[0].main);
    dayImg.classList.add("day-image");
    //     This is done in case date wraps around the end of the month, so creating it as a date object makes setting the date easy
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + day);
    let dd = targetDate.getDate();
    let mm = targetDate.getMonth();

    let date = document.createElement("h4");
    date.setAttribute("style", "margin: 0px; padding: 0px;");
    date.append(`${mm}/${dd}`);

    dailyTemps[day].append(date);
    dayWrapper.append(highlow);
    dayWrapper.append(dayImg);
    dailyTemps[day].append(dayWrapper);

    dailyTempsBody[day].append(`Humidity: ${metadata.daily[day].humidity}`);
    dailyTempsBody[day].appendChild(document.createElement("br"));
    dailyTempsBody[day].append(`UVI: ${metadata.daily[day].uvi}`);
    dailyTempsBody[day].appendChild(document.createElement("br"));
    dailyTempsBody[day].append(`Wind Speed: ${metadata.daily[day].wind_speed}`);
  }
  //     Having today initially selected to display outfit
  document.querySelector(".day-weather").click();
}

// Simple function called in daily and hourly weather to set the image based on whatever the api string is, so this is what the src in those functions is being set to
function getWeatherIcon(weather) {
  switch (weather.toLowerCase()) {
    case "clear":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F32.png?v=1636503242740";
    case "few clouds":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F30.png?v=1636503242740";
    case "clouds":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F28.png?v=1636503242740";
    case "overcast clouds":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F28.png?v=1636503242740";
    case "light rain":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F11.png?v=1636503242740";
    case "rain":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F11.png?v=1636503242740";
    case "snow":
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2F46_1.png?v=1636564146717";
    default:
      return "https://cdn.glitch.me/a417c1c4-717a-4388-86b0-1bc9e7b3f7bb%2Fna.png?v=1636503268968";
  }
}

// Have to create unique function because can't pass in variable as article because
// it won't actually mutate the variable (for example, can't pass in shirtIndex)
// All these are very intuitive, loops around if it is going to go past the length of 3 or to -1
let topIndex = 1;

function changeTop(n) {
  topIndex += n;
  if (topIndex == 3) {
    topIndex = 0;
  }
  if (topIndex == -1) {
    topIndex = 2;
  }
  updateArticles();
}

let pantIndex = 1;

function changePant(n) {
  pantIndex += n;
  if (pantIndex == 3) {
    pantIndex = 0;
  }
  if (pantIndex == -1) {
    pantIndex = 2;
  }
  updateArticles();
}

let accesoryIndex = 1;

function changeAccesory(n) {
  accesoryIndex += n;
  if (accesoryIndex == 3) {
    accesoryIndex = 0;
  }
  if (accesoryIndex == -1) {
    accesoryIndex = 2;
  }
  updateArticles();
}

let warmTopIndex = 1;

function changeWarmTop(n) {
  warmTopIndex += n;
  if (warmTopIndex == 3) {
    warmTopIndex = 0;
  }
  if (warmTopIndex == -1) {
    warmTopIndex = 2;
  }
  updateArticles();
}

let shortIndex = 1;

function changeShorts(n) {
  shortIndex += n;
  if (shortIndex == 3) {
    shortIndex = 0;
  }
  if (shortIndex == -1) {
    shortIndex = 2;
  }
  updateArticles();
}

// Rather than setting the src to certain articles, we just chose to display all articles where they belong appropriately, but hid the articles that shouldn't be shown based on the current temperature
function setArticles(temp) {
  if (temp > 75) {
    document.querySelector("#sweater").setAttribute("style", "display: none");
    document.querySelector("#pants").setAttribute("style", "display: none");
    document.querySelector("#accesory").setAttribute("style", "display: none");
    document.querySelector("#normal").setAttribute("style", "display: none");
    document.querySelector("#cold").setAttribute("style", "display: none");

    document.querySelector("#shorts").setAttribute("style", "display: block");
    document.querySelector("#shirt").setAttribute("style", "display: block");
    document.querySelector("#hot").setAttribute("style", "display: block");
  } else if (temp > 60) {
    document.querySelector("#sweater").setAttribute("style", "display: none");
    document.querySelector("#shorts").setAttribute("style", "display: none");
    document.querySelector("#hot").setAttribute("style", "display: none");
    document.querySelector("#cold").setAttribute("style", "display: none");

    document.querySelector("#accesory").setAttribute("style", "display: block");
    document.querySelector("#shirt").setAttribute("style", "display: block");
    document.querySelector("#pants").setAttribute("style", "display: block");
    document.querySelector("#normal").setAttribute("style", "display: block");
  } else {
    document.querySelector("#shirt").setAttribute("style", "display: none");
    document.querySelector("#shorts").setAttribute("style", "display: none");
    document.querySelector("#normal").setAttribute("style", "display: none");
    document.querySelector("#hot").setAttribute("style", "display: none");

    document.querySelector("#accesory").setAttribute("style", "display: block");
    document.querySelector("#sweater").setAttribute("style", "display: block");
    document.querySelector("#pants").setAttribute("style", "display: block");
    document.querySelector("#cold").setAttribute("style", "display: block");
  }
  document.querySelector("#displayTemp").innerHTML = temp;
}

// Sets the current temperature when website first loads and when any day is clicked and this funciton sets the appropriate outfits as visible
async function setTemp(
  id,
  lati = 42.3329882,
  long = -71.1052938,
  apiKey = "337afdebcc388b85fbf9a9545db32f33"
) {
  let metadataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&units=imperial&appid=${apiKey}`;
  // wait here until the response comes back
  const metadataResponse = await fetch(metadataUrl);
  // now wait until we can get the JSON version of it - a Javascript object!
  const metadata = await metadataResponse.json();
  setArticles(metadata.daily[id].temp.day);
}

// Updates articles to appropriate index as changed in the change functions, controlled by carousel buttons
function updateArticles() {
  document.querySelector("#shirt").src = tops[topIndex];
  document.querySelector("#pants").src = pants[pantIndex];
  document.querySelector("#accesory").src = accessories[accesoryIndex];
  document.querySelector("#shorts").src = shorts[shortIndex];
  document.querySelector("#sweater").src = warmTops[warmTopIndex];
}

// For randomize button, just picks random index out of 2 becasue there are 3 items in each array
function randomizeOutfits(max = 3) {
  topIndex = Math.floor(Math.random() * max);
  pantIndex = Math.floor(Math.random() * max);
  accesoryIndex = Math.floor(Math.random() * max);
  warmTopIndex = Math.floor(Math.random() * max);
  shortIndex = Math.floor(Math.random() * max);
  updateArticles();
}

// Function to allow both top and sweater to be changed simultaneously with the same onclick function
function changeUppers(n) {
  changeTop(n);
  changeWarmTop(n);
}

// Function to allow both pants and shorts to be changed simultaneously with the same onclick function
function changeLowers(n) {
  changePant(n);
  changeShorts(n);
}
