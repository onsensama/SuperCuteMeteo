const APIkey = "3cc044c4c340b1f70cd8b53a70460865";

let dataMeteo;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      CallAPI(location.lat, location.lon);
    },
    () => {
      alert(
        "You declined the location, please activate it to use the application"
      );
    }
  );
}

function CallAPI(lat, lon) {
  fetch(`
https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${APIkey}`)
    .then((res) => res.json())
    .then((data) => {
      dataMeteo = data;

      console.log(dataMeteo);

      displayWeather(dataMeteo);
    });
}

function displayWeather(dataMeteo) {
  currentWeather(dataMeteo);
  forecastHours(dataMeteo);
  // forecastDays();
}

function currentWeather(dataMeteo) {
  const weatherImg = document.querySelector(".current-weather-picture");
  const degree = document.querySelector(".current-degree");
  const weatherText = document.querySelector(".current-weather-text");
  const currentweather = dataMeteo.current.weather[0].icon;
  const currentDegree = dataMeteo.current.temp;
  const currentWeather = dataMeteo.current.weather[0].description;

  weatherImg.src = `assets/img/weather/${currentweather}.png`;
  degree.innerText = `${Math.round(currentDegree)}º`;
  weatherText.innerText = `${currentWeather}`;
}

function forecastHours(dataMeteo) {
  const hours = document.querySelectorAll(".hour");
  const degrees = document.querySelectorAll(".degree");
  let currentHour = new Date().getHours();

  for (let i = 0; i < hours.length; i++) {
    let hour = currentHour + i * 3;
    if (hour === 24) {
      hours[i].innerText = `00h`;
    } else if (hour > 24) {
      hours[i].innerText = `${hour - 24}h`;
    } else {
      hours[i].innerText = `${hour}h`;
    }
  }

  for (let i = 0; i < degrees.length; i++) {
    const degree = dataMeteo.hourly[i * 3].temp;
    degrees[i].innerText = `${Math.round(degree)}º`;
  }
}
