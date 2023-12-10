// Select Dom Element
const temperatureElement = document.querySelector(".temperature");
const statusElement = document.querySelector(".statusText");
const minWeatherEl = document.querySelector(".minWeather");
const maxWeatherEl = document.querySelector(".maxWeather");
// url
const weatherUrl =
  "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";

//get temperature
const getTemperatures = async () => {
  const response = await fetch(weatherUrl);
  const weatherData = await response.json();

  const CurrentWeather = weatherData[0].current;
  const floorCurrentWeather = Math.round(CurrentWeather);

  temperatureElement.innerHTML = `<span>${floorCurrentWeather.toLocaleString(
    "fa-IR"
  )}° </span>`;

  console.log(weatherData[0].weather);
};
//get discription
const getDiscription = async () => {
  const response = await fetch(weatherUrl);
  const weatherData = await response.json();

  const StatusText = weatherData[0].customDescription;

  statusElement.innerHTML = `<span style= "display="flex" ">${StatusText.text}${StatusText.emoji} </span>`;
};
//get min and Max
const getMinAndMax = async () => {
  const response = await fetch(weatherUrl);
  const weatherData = await response.json();

  const min = weatherData[0].min;
  const max = weatherData[0].max;
  minWeatherEl.innerHTML = `<span style= "display="flex" "> ${Math.round(
    min
  ).toLocaleString("fa-IR")}° حداقل</span>`;
  maxWeatherEl.innerHTML = `<span style= "display="flex" ">${Math.round(
    max
  ).toLocaleString("fa-IR")}° حداکثر</span>`;
};
getMinAndMax();
getDiscription();
getTemperatures();
