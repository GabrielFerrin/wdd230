const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?id=3654410&units=imperial&appid=7355654a40f63232368257f667f78b4b';
const getWeather = async () => {
  const response = await fetch(weatherUrl);
  if (response.ok) {
    const data = await response.json();
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src =
      `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weatherSpan = document.getElementById('weather-span');
    weatherSpan.textContent = data.main.temp.toFixed(0) +
      '°F - ' + capitalizeWords(data.weather[0].description);
  }
}

getWeather();

const capitalizeWords = (str) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() +
    word.slice(1)).join(' ');
}