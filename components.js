function makeDayWeather(weather) {
  let dayWrapper = document.createElement('div');
  dayWrapper.classList.add('day-weather');

  let text = document.createElement('div');
  text.append('testing');
  dayWrapper.append(text);
  dayWrapper.classList.add('textFix');

  document.getElementById("weatherItems").appendChild(dayWrapper);

}
