# Hello website!

This is a basic HTML project that allows users to view the hourly weather in boston, daily weather, and what they should wear that day based on the weather. The hourly weather is displayed at the top of the screen, users can scroll across if all hourly weathers do not fit on their screen, and the temperature and the weather (cloudy, sunny, rainy, etc) is displayed as an image below as well. On the lefthand side of the screen is the daily weather in boston. Displayed is the date, the high temp, low temp, and another image of the weather like with the hourly. If a daily weather is clicked, humidity, UV index, and wind speed are displayed. Only one daily weather can be displayed at a time. If a daily weather is pressed, then the suggested outfit will be based on that days temperature. Users are able to adjust the temperature next to the outfit so they can se what they should wear at a different temperature. Based on the temperature, with the ranges being cold normal and hot, users are shown a different background and combination of outfits they can cycle through or randomize to figure out what they should wear in a day.
## What's in this project?

← `README.md`: Info on full functionality of project and file usage

← `index.html`: One page website. Divs and wrappers estabilished here, but majority of data is added dynamiclly from our JS file.

← `style.css`: CSS files add styling rules to your content. The CSS applies styles to the elements in your HTML page. 

← `components.js`: All functionality is stored here including how weather data is populated and functionality to cycle through outfits.

## Functions

← `makeDayWeather()`: Creates the div with layout for letter, but information is populated in async function
← `makeHourWeather()`: Same deal as day weather, information is populated in async function
← `expand()`: Hiding all expanded portion except for the one that was just clicked, which makes it so only one can be expanded at a time
← `getLocation()`: this wasn't ever implemented, was going to use geolocation for weather, but leaving in case implemented later
← `getHourlyForecast(  lati = 42.3329882, long = -71.1052938, apiKey = "337afdebcc388b85fbf9a9545db32f33")`: Params: lati is latitude of location, long is longitude of location, api key is api key for api request and is a personal key. Updates the hourly weather with the correct information (time, temp and image) Retreive hourly forecast, inputs aren't actually used, but left in case geolocation wants to be later implemented as mentioned in previous function
← `getForecast(lati = 42.3329882, long = -71.1052938, apiKey = "337afdebcc388b85fbf9a9545db32f33")`: Params: lati is latitude of location, long is longitude of location, api key is api key for api request and is a personal key. Updates the daily weather with the correct information (time, temp and image) Retreive daily forecast, inputs aren't actually used, but left in case geolocation wants to be later implemented as mentioned in previous function
← `getWeatherIcon(weather)`: Params: weather represents the current temp. Simple function called in daily and hourly weather to set the image based on whatever the api string is, so this is what the src in those functions is being set to
← `changeTop(n), changePant(n), changeAccesory(n), changeWarmTop(n),changeShorts(n)`: params: n is the direction in which we should itterate through the array. Have to create unique function because can't pass in variable as article because it won't actually mutate the variable (for example, can't pass in shirtIndex). All these are very intuitive, loops around if it is going to go past the length of 3 or to -1.
← `setArticles()`: Rather than setting the src to certain articles, we just chose to display all articles where they belong appropriately, but hid the articles that shouldn't be shown based on the current temperature
← `setTemp()`: Sets the current temperature when website first loads and when any day is clicked and this funciton sets the appropriate outfits as visible
← `updateArticles()`: Updates articles to appropriate index as changed in the change functions, controlled by carousel buttons
← `randomizeOutfits()`: For randomize button, just picks random index out of 2 becasue there are 3 items in each array
← `changeUppers()`: Function to allow both top and sweater to be changed simultaneously with the same onclick function
← `changeLowers()`: Function to allow both pants and shorts to be changed simultaneously with the same onclick function
