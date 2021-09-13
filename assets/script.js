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

