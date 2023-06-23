// const and variables
const tempContainer = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');
const weatherImage = document.getElementById('weather-image');
const weatherDesc = document.getElementById('weather-description');
const serverError = document.getElementsByClassName('server-error');
const ldsRipple = document.getElementsByClassName('load-animation');
const weatherSeparator1 = document.getElementsByClassName('weather-separator-01');
const weatherSeparator2 = document.getElementsByClassName('weather-separator-02');
let windchill = document.getElementById('windchill');
url = 'https://api.openweathermap.org/data/2.5/weather?q=Manta&units=imperial&appid=7355654a40f63232368257f667f78b4b';
// fetch
apiFetch();

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // populate elements
      tempContainer.innerText = data.main.temp.toFixed(0);
      windSpeed.innerText = data.wind.speed;
      windchill.innerText = getWindchill(data.main.temp, data.wind.speed);
      weatherImage
      .setAttribute('src',
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)

      weatherDesc.innerText = camelize(data.weather[0].description);
      // stop loading animation
      setTimeout(() => {
        showData();
      }, 1000);
    } else {
      // user friendly error message
      showWindchilError();
    }
  } catch (error) {
    // user friendly error message
    showWindchilError();
  }
}

function getWindchill(temp, speed) {
  // wind chill
  if (temp <= 50 && speed > 3) {
    console.log('executed');
    return (35.74 + (0.6215 * temp) -
      (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp *
        Math.pow(speed, 0.16))).toFixed(0);
  } else {
    return 'N/A';
  }
}

function showData() {
  weatherSeparator1[0].style.display = 'flex';
  weatherSeparator2[0].style.display = 'grid';
  ldsRipple[0].style.display = 'none';
}

function showWindchilError() {
  weatherSeparator1[0].style.display = 'none';
  weatherSeparator2[0].style.display = 'none';
  ldsRipple[0].style.display = 'none';
  serverError[0].style.display = 'block';
}

function camelize(str) {
  const words = str.split(" ");
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(" ");
}