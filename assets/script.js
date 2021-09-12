var APIKey = "45d16616d8a2ece41cc37e7a1088d048"

var city = "";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";


fetch(queryURL)