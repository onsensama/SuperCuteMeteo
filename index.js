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

      dataDisplay(dataMeteo);
    });
}

function dataDisplay(dataMeteo) {
  displayMainPicture(dataMeteo);
}

function displayMainPicture(dataMeteo) {
  const weatherImg = document.querySelector(".weather-main-picture");
  const currentweather = dataMeteo.current.weather[0].description;

  switch (currentweather) {
    case "clear sky":
      weatherImg.src = "/assets/img/weather/clear_sky.png";
      break;
    case "broken clouds":
      weatherImg.src = "/assets/img/weather/broken_clouds.png";
      break;
    case "mist":
      weatherImg.src = "/assets/img/weather/mist.png";
      break;
    case "rain":
      weatherImg.src = "/assets/img/weather/rain.png";
      break;
    case "scattered clouds":
      weatherImg.src = "/assets/img/weather/scattered_clouds.png";
      break;
    case "shower rain":
      weatherImg.src = "/assets/img/weather/shower_rain.png";
      break;
    case "snow":
      weatherImg.src = "/assets/img/weather/snow.png";
      break;
    case "thunderstorm":
      weatherImg.src = "/assets/img/weather/thunderstorm.png";
      break;
    case "wind":
      weatherImg.src = "/assets/img/weather/wind.png";
      break;

    default:
      console.log("problemos");
      break;
  }
}
