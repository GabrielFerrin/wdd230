const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75033573207744&lon=6.635844281871475&units=imperial&appid=7355654a40f63232368257f667f78b4b';
const getWeather = async () => {
  const card = document.getElementById('card-body');
  const currentTemp = document.querySelector('#current-temp');
  const response = await fetch(openWeatherUrl);
  if (response.ok) {
    const data = await response.json();
    currentTemp.textContent = `${data.main.temp.toFixed(0)}°F`;
    data.weather.forEach(element => {
      const desc = capitalizeWords(element.description);
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = `https://openweathermap.org/img/wn/${element.icon}@2x.png`;
      img.atr = desc;
      img.setAttribute('loading', 'lazy');
      figure.appendChild(img);
      const figcaption = document.createElement('figcaption');
      figcaption.textContent = desc;
      figure.appendChild(figcaption);
      card.appendChild(figure);
    });
  } else {
    captionDesc.textContent = response.text();
  }
}
getWeather();

function capitalizeWords(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}