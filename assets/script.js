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

      const queryUVIndex =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;

      $.ajax({
        url: queryUVIndex,
        method: "GET"
        // Store all of the retrieved data inside of an object called "uvIndex"
      }).then(function(uvIndex) {
        console.log(uvIndex);

        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");

        $("#current-uv").text("UV Index: ");
        $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
        console.log(uvIndex[0].value);

        $.ajax({
          url: queryForecast,
          method: "GET"
          // Store all of the retrieved data inside of an object called "forecast"
        }).then(function(forecast) {
          console.log(queryForecast);

          console.log(forecast);
          // Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
          for (var i = 6; i < forecast.list.length; i += 8) {
            // 6, 14, 22, 30, 38
            var forecastDate = $("<h5>");

            var forecastPosition = (i + 2) / 8;

            console.log("#forecast-date" + forecastPosition);

            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );

            const forecastIcon = $("<img>");
            forecastIcon.attr(
              "src","https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + ".png"
            );

            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);

            console.log(forecast.list[i].weather[0].icon);

            $("#forecast-temp" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " F"
            );
            $("#forecast-humidity" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );

            $(".forecast").attr(
              "style", "background-color:rgba(71, 156, 212, 0.637); color:white"
            );
          }
        });
      });
    });
}

