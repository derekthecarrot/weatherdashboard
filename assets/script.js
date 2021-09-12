var city = "Raleigh"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=45d16616d8a2ece41cc37e7a1088d048" + "&units=imperial";

fetch(queryURL)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    document.querySelector("#CityText").innerText = city;
    document.querySelector("#Temp").innerText = "Temperature: " + data.main.temp
    document.querySelector("#Wind").innerText = "Wind: " + data.wind.speed
    document.querySelector("#Humidity").innerText = "Humidity: " + data.main.humidity
    document.querySelector("#UV-Index").innerText = "UV-Index: "
  });
