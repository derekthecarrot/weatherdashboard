function createList(citySearch) {
  $("#city-list").empty();

  let keys = Object.keys(citySearch);
  for (var i = 0; i < keys.length; i++) {
    let cityLists = $("<button>");
    cityLists.addClass("list-group-item list-group-item-action");

    let splLoop = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < splLoop.length; j++) {
      splLoop[j] =
        splLoop[j].charAt(0).toUpperCase() + splLoop[j].substring(1);
    }
    let titleCasedCity = splLoop.join(" ");
    cityLists.text(titleCasedCity);

    $("#city-list").append(cityLists);
  }
}

function populateCityWeather(city, citySearch) {
  createList(citySearch);

  const queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" + city;

  const queryForecast = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" + city;

  var latitude;

  var longitude;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(weather) {

      const todayMoment = moment();

      const showMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        showMoment.text("(" + todayMoment.format("M/D/YYYY") + ")")
      );

      const cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);

      const weatherIcon = $("<img>");
      weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
      );
      $("#iconweather").empty();
      $("#iconweather").append(weatherIcon);

      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");

      latitude = weather.coord.lat;
      longitude = weather.coord.lon;

      const queryUVIndex =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=45d16616d8a2ece41cc37e7a1088d048&q=" + "&lat=" + latitude + "&lon=" + longitude;

      $.ajax({
        url: queryUVIndex,
        method: "GET"

      }).then(function(uvIndex) {

        const uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");

        $("#current-uv").text("UV Index: ");
        $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));

        $.ajax({
          url: queryForecast,
          method: "GET"
        }).then(function(forecast) {
        
          for (var i = 6; i < forecast.list.length; i += 8) {
            const forecastDate = $("<h5>");
            const forecastPos = (i + 2) / 8;

            $("#forecast-date" + forecastPos).empty();
            $("#forecast-date" + forecastPos).append(
              forecastDate.text(todayMoment.add(1, "days").format("M/D/YYYY"))
            );

            const forecastIcon = $("<img>");
            forecastIcon.attr(
              "src","https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + ".png"
            );

            $("#forecast-icon" + forecastPos).empty();
            $("#forecast-icon" + forecastPos).append(forecastIcon);
            $("#forecast-temp" + forecastPos).text(
              "Temp: " + forecast.list[i].main.temp + " F"
            );
            $("#forecast-humidity" + forecastPos).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );

            $(".forecast").attr("style", "background-color:rgba(71, 156, 212, 0.637); color:white"
            );
          }
        });
      });
    });
}

$(document).ready(function() {
  var citySearchStringified = localStorage.getItem("citySearch");

  var citySearch = JSON.parse(citySearchStringified);

  if (citySearch == null) {
    citySearch = {};
  }

  createList(citySearch);

  $("#current-weather").hide();
  $("#forecast-weather").hide();


  $("#search-button").on("click", function(event) {
    event.preventDefault();
    let city = $("#city-input")
      .val().trim()

    if (city != "") {
    
      citySearch[city] = true;
    localStorage.setItem("citySearch", JSON.stringify(citySearch));

    populateCityWeather(city, citySearch);

    $("#current-weather").show();
    $("#forecast-weather").show();
    }

  });

  $("#city-list").on("click", "button", function(event) {
    event.preventDefault();
    let city = $(this).text();

    populateCityWeather(city, citySearch);

    $("#current-weather").show();
    $("#forecast-weather").show();
  });
});