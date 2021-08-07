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

      displayInfosWeather(dataMeteo);
    });
}

function displayInfosWeather(dataMeteo) {
  currentInfos(dataMeteo);
  // hoursInfos();
  // daysInfos();
}

function currentInfos(dataMeteo) {
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
