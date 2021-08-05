const APIkey = "3cc044c4c340b1f70cd8b53a70460865";
let resultsAPI;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      getAPI(location.lat, location.lon);
    },
    () => {
      alert(
        "You declined the location, please activate it to use the application"
      );
    }
  );
}

function getAPI(lat, lon) {
  fetch(`
https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${APIkey}`)
    .then((res) => res.json())
    .then((data) => console.log(data));
}
