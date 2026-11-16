const weatherContainer = document.getElementById("weather-container");
const currentConditions = document.getElementById("current-conditions");
const hero = document.getElementById("hero");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto";

function getCondition(code) {
  if (code >= 0 && code <= 1) {
    return { label: "Sunny", icon: "assets/sunny-icon.png", photo: "assets/sunny-icon.jpeg" };
  } else if (code >= 2 && code <= 3) {
    return { label: "Cloudy", icon: "assets/clouds-icon.png", photo: "assets/clouds-icon.jpeg" };
  } else if (code >= 40 && code <= 49) {
    return { label: "Fog", icon: "assets/fog-icon.webp", photo: "assets/fog-icon.webp" };
  } else if (code >= 50 && code <= 69) {
    return { label: "Rain", icon: "assets/rain-icon.png", photo: "assets/rain-icon.jpeg" };
  } else if (code >= 70 && code <= 79) {
    return { label: "Snow", icon: "assets/snow-icon.png", photo: "assets/snow-icon.jpeg" };
  } else if (code >= 80 && code <= 84) {
    return { label: "Showers", icon: "assets/rain-icon.png", photo: "assets/rain-icon.jpeg" };
  } else if (code >= 85 && code <= 86) {
    return { label: "Snow showers", icon: "assets/snow-icon.png", photo: "assets/snow-icon.jpeg" };
  } else if (code >= 95 && code <= 99) {
    return { label: "Thunderstorm", icon: "assets/storm-icon.png", photo: "assets/storm-icon.jpeg" };
  }

  // Only runs if no range above matched
  return { label: "Cloudy", icon: "assets/clouds-icon.png", photo: "assets/clouds-icon.jpeg" };
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const maxWinds = data.daily.wind_speed_10m_max;

    for (let i = 0; i < dates.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      const date = document.createElement("h2");
      date.textContent = dates[i];

      const maxTemp = document.createElement("p");
      maxTemp.textContent = "High: " + maxTemps[i] + "°F";

      const minTemp = document.createElement("p");
      minTemp.textContent = "Low: " + minTemps[i] + "°F";

      let windImageFile;
      let windAltText;
      if (maxWinds[i] < 10) {
        windImageFile = "assets/light.png";
        windAltText = "Light wind";
      } else if (maxWinds[i] < 20) {
        windImageFile = "assets/moderate.png";
        windAltText = "Moderate wind";
      } else if (maxWinds[i] < 40)  {
        windImageFile = "assets/strong.png";
        windAltText = "Strong wind";
      }  else {
        windImageFile = "assets/verystrong.png";
        windAltText = "Very strong wind";
      } 
      const windLine = document.createElement("div");
      windLine.classList.add("wind-line");

      const windText = document.createElement("p");
      windText.textContent = "Max wind: " + maxWinds[i] + " mph";

      const windImage = document.createElement("img");
      windImage.src = windImageFile;
      windImage.alt = windAltText;
      windImage.classList.add("wind-icon");

      windLine.appendChild(windText);
      windLine.appendChild(windImage);
      
      const uvIndex = document.createElement("p");
      uvIndex.textContent = "UV index: " + maxWinds[i];
      card.appendChild(date);
      card.appendChild(maxTemp);
      card.appendChild(minTemp);
      card.appendChild(windLine);
      card.appendChild(uvIndex);

      weatherContainer.appendChild(card);
    }

    const currentTemp = data.current.temperature_2m;
const currentCode = data.current.weather_code;
const currentCondition = getCondition(currentCode);
hero.style.backgroundImage = `url(${currentCondition.photo})`;

const nowHeading = document.createElement("h2");
nowHeading.textContent = "Current conditions";

const currentIcon = document.createElement("img");
currentIcon.src = currentCondition.icon;
currentIcon.alt = currentCondition.label;
currentIcon.classList.add("current-icon");

const currentTempText = document.createElement("p");
currentTempText.textContent = Math.round(currentTemp) + "°F";
currentTempText.classList.add("current-temp");

const currentLabel = document.createElement("p");
currentLabel.textContent = currentCondition.label;
currentLabel.classList.add("current-label");

const todayWind = document.createElement("p");
todayWind.textContent = "Max wind today: " + maxWinds[0] + " mph";

currentConditions.appendChild(nowHeading);
currentConditions.appendChild(currentIcon);
currentConditions.appendChild(currentTempText);
currentConditions.appendChild(currentLabel);
currentConditions.appendChild(todayWind);
  })

  .catch(error => {
    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";
    console.error("Error fetching weather data:", error);
  });

