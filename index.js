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
  const currentweather = dataMeteo.current.weather[0].icon;

  switch (currentweather) {
    case "01d":
    case "01n":
      weatherImg.src = "/assets/img/weather/01d.png";
      break;
    case "02d":
    case "02n":
      weatherImg.src = "/assets/img/weather/02d.png";
      break;
    case "03d":
    case "03n":
      weatherImg.src = "/assets/img/weather/03d.png";
      break;
    case "04d":
    case "04n":
      weatherImg.src = "/assets/img/weather/04d.png";
      break;
    case "09d":
    case "09n":
      weatherImg.src = "/assets/img/weather/09d.png";
      break;
    case "10d":
    case "10n":
      weatherImg.src = "/assets/img/weather/10d.png";
      break;
    case "11d":
    case "11n":
      weatherImg.src = "/assets/img/weather/11d.png";
      break;
    case "13d":
    case "13n":
      weatherImg.src = "/assets/img/weather/13d.png";
      break;
    case "50d":
    case "50n":
      weatherImg.src = "/assets/img/weather/50d.png";
      break;

    default:
      console.log("problemos");
      break;
  }
}
