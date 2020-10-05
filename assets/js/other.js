$("button").on("click", function(event){

    var citySearch = $(".citySearch").val();
    var APIkey = "6cba4494ea3720d9f5389a6bf15786ae";
    var startDate = moment().format('M/DD/YYYY');  // Current Date
    var day1 = moment().add(1, 'days').format('M/DD/YYYY');
    var day2 = moment().add(2, 'days').format('M/DD/YYYY');
    var day3 = moment().add(3, 'days').format('M/DD/YYYY');
    var day4 = moment().add(4, 'days').format('M/DD/YYYY');
    var day5 = moment().add(5, 'days').format('M/DD/YYYY');

        $("#current").empty();
        $("#extended").empty();
        $("#day1").empty();
        $("#day2").empty();
        $("#day3").empty();
        $("#day4").empty();
        $("#day4").empty();

            // current
        var queryURLcurr = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIkey;
        console.log("queryUrlcurr");

        $.ajax ({
            url:queryURLcurr,
            method: "GET",
        })
        .then(function(response) {
            console.log(response);    

            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            console.log(iconUrl);
            var lat = response.coord.lat; // Latiude 
            var lon = response.coord.lon; // Longitude     

            $("#current").append (
                "<div class='col s12 m6'>"
                +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
                +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
                +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            );

                // extended
            var queryURLext = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + APIkey;
            console.log("extended", queryURLext);

            $.ajax({
                url: queryURLext,
                method: "GET",
            })
            .then(function(response) {                    
                
                //icon urls
                var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
                var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
                var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
                var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

                // add UV index
                $("#current").append(
                    "<div class='col s12 m6'>"
                   + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + response.current.uvi + "</button>"
                   + "</div>"
                   );

                // UV Index colors
                if (response.current.uvi <=2) {
                    $("#uvIndex").css("background-color", "green");
                }
                    else if (response.current.uvi <=5) {
                        $("#uvIndex").css("background-color", "yellow");
                    } else if (response.current.uvi <=7) {
                        $("uvIndex").css("background-color", "orange");
                    } else if (response.current.uvi <=10) {
                        $("uvIndex").css("background-color", "red");
                    } else if (response.current.uvi <=40) {
                        $("uvIndex").css("background-color", "purple");
                    }

                $("#extended").append(
                    "<dive class = 'col-md-12'>" + "<h2 id='extended>" + "5-day Forecast: " + "</h2>"
                );

                // Day 1
                $("#day1").append(
                    "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day1 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>" +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" + "</div>" 
                );

                // Day 2
                $("#day2").append(
                    "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day2 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>" +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" + "</div>" 
                );

                // Day 3
                $("#day3").append(
                    "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day3 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>" +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" + "</div>" 
                );

                // Day 4
                $("#day4").append(
                    "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day4 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>" +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>" + "</div>" 
                );    
                
                // Day 5
                $("#day5").append(
                    "<div class = 'extended card col s12 m6'>" + "<div class = 'card-body'>" + "<div class='card-header'>" + day5 + "</div>" + "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" + "</div>" + "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>" +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" + "</div>" 
                );                

            })
        }); 
})
