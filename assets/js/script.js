var cityList = [];

$(function () { 
    loadData();

    $("#button-addon2").on("click", function () {
        loadData();
    });

});

function loadData() {
    aarayify();
    stringify();
}

function aarayify() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cityList = storedCities;
    }

    renderSearchedCities();

    var cityName = $("#cityName").val().trim();
    if (cityName !== "") {
        renderWeather(cityName);
    }
}
   
function stringify() {
    var city = $("#cityName").val().trim();
    if (city !== "") {
        // console.log("Bro, where you at?");

        cityList.unshift(city);
        // console.log(cityList)

        var cityListStorage = JSON.stringify(cityList);
        if (cityListStorage !== null) {
            // console.log(cityListStorage);
            localStorage.setItem("cities", cityListStorage);
        }
    }
}
              
function renderSearchedCities() {
    $("#cityList").empty();
    $("#cityName").value = "";

    // console.log(cityList);
    if (cityList != null) {
        for (var i = 0; i <cityList.length; i++) {
            var entry = cityList[i];
            var li = document.createElement("li");
            li.textContent = entry;
            $(li).attr("class", "list-group-item");
            li.setAttribute("data-index", i);
            li.onclick = function (event) {
                event.preventDefault();
                var cityName = $(this).text();
                renderWeather(cityName);
            };
            $("#cityList").append(li);

        }
    }
}

    $(".list-group-item button").on("click", function (event) {
        event.preventDefault();
        cityName = $($(this).text());
        renderWeather(cityName);
     });

       
function renderWeather(cityName) {
    var citySearch = cityName;
    var APIkey = "6cba4494ea3720d9f5389a6bf15786ae";
    var startDate = moment().format('M/DD/YYYY');  // Current Date
    var day1 = moment().add(1, 'days').format('M/DD');
    var day2 = moment().add(2, 'days').format('M/DD');
    var day3 = moment().add(3, 'days').format('M/DD');
    var day4 = moment().add(4, 'days').format('M/DD');
    var day5 = moment().add(5, 'days').format('M/DD');

    $("#current").empty();
    $("#extended").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day4").empty();

    // current weather
    var queryURLcurr = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIkey;
    // console.log("queryUrlcurr");

    $.ajax({
        url: queryURLcurr,
        method: "GET",
    })
        .then(function (response) {
            // console.log(response);

            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            // console.log(iconUrl);
            var lat = response.coord.lat;
            var lon = response.coord.lon;     

            $("#current").append(
                "<div class='col s12 m6'>"
                + "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl + "'>" + "</h2>"
                + "<ul class='daily'>" + "Temperature: " + response.main.temp + " °F" + "</ul>"
                + "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                + "<ul class='daily'>" + "Wind Speed: " + response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            );

            // extended forecast
            var queryURLext = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIkey;
            // console.log("extended", queryURLext);

            $.ajax({
                url: queryURLext,
                method: "GET",
            })
                .then(function (response) {

                    //icon urls
                    var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                    var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
                    var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
                    var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                    var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

                    // add UV index
                    $("#current").append("<div class='col s12 m6'>" + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + response.current.uvi + "</button>" + "</div>"
                    );

                    // UV Index colors
                    if (response.current.uvi <= 2) {
                        $("#uvIndex").css("background-color", "blue");
                    }                    
                    else if (response.current.uvi <= 5) {
                        $("#uvIndex").css("background-color", "green");
                    } else if (response.current.uvi <= 7) {
                        $("#uvIndex").css("background-color", "yellow");
                    } else if (response.current.uvi <= 8) {
                        $("#uvIndex").css("background-color", "orange");
                    } else if (response.current.uvi <= 10) {
                        $("#uvIndex").css("background-color", "red");
                    }

                    $("#extended").append(
                        "<dive class = 'col-md-12'>" + "<h2 id='extended>" + "5-day Forecast: " + "</h2>"
                    );

                    // Day 1
                    $("#day1").append(
                        "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day1 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>" + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" + "</div>"
                    );

                    // Day 2
                    $("#day2").append(
                        "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day2 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>" + "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" + "</div>"
                    );

                    // Day 3
                    $("#day3").append(
                        "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day3 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>" + "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" + "</div>"
                    );

                    // Day 4
                    $("#day4").append(
                        "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day4 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>" + "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>" + "</div>"
                    );

                    // Day 5
                    $("#day5").append(
                        "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day5 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>" + "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" + "</div>"
                    );

                })
        });
}
