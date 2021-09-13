function createList(citySearch) {
  $("#city-list").empty();

  var keys = Object.keys(citySearch);
  for (var i = 0; i < keys.length; i++) {
    var cityLists = $("<button>");
    cityLists.addClass("list-group-item list-group-item-action");

    var splLoop = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < splLoop.length; j++) {
      splLoop[j] =
        splLoop[j].charAt(0).toUpperCase() + splLoop[j].substring(1);
    }
    var titleCasedCity = splLoop.join(" ");
    cityLists.text(titleCasedCity);

    $("#city-list").append(cityLists);
  }
}

function populateCityWeather(city, citySearch) {
  createList(citySearch);

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" +
    city;

  var queryForecast =
  "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" +
    city;

  var latitude;

  var longitude;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Store all of the retrieved data inside of an object called "weather"
    .then(function(weather) {
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(weather);

      var nowMoment = moment();

      const displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );

      const cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);

      const weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
      );
      $("#iconweather").empty();
      $("#iconweather").append(weatherIcon);

      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");

      latitude = weather.coord.lat;
      longitude = weather.coord.lon;
