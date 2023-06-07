const celciusTemperature = document.getElementById('temperature').innerText;
const speedKilometers = document.getElementById('wind-speed').innerText;

// Celsius to Fahrenheit
const fahrenheitTemperature = (celciusTemperature * 1.8) + 32;
// Kilometers per hour
const speedMiles = speedKilometers / 1.609;

// wind chill
let windchill;
if (fahrenheitTemperature <= 50 && speedMiles > 3) {
  windchill =  35.74 + (0.6215 * fahrenheitTemperature) -
    (35.75 * Math.pow(speedMiles, 0.16)) + (0.4275 * fahrenheitTemperature *
    Math.pow(speedMiles, 0.16));
  windchill = ((windchill - 32) * (5 / 9)).toFixed(0) + ' °C';
} else {
  windchill = 'N/A';
}

// Fahrenheit to Celsius

document.getElementById('windchill').innerText = windchill;


