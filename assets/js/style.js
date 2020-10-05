$(document).ready(function(){
    var cityName = document.querySelector("#cityList");
    var cityList = [];

    aarayify();

    function aarayify() {
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if (storedCities !== null) {
            cityList = storedCities;
        }
        renderSearchedCities();
    }

    function renderSearchedCities () {
        $("#cityList").empty();
        document.getElementsByClassName('citySearch').value = "";

        for (var i = 0; i < cityList.length + 1; i++) {
            var entry = cityList[i];
            var li = document.createElement("li");
            li.textContent = entry;
            $("li").attr("class", "list-group-item");
            li.setAttribute("data-index", i);
            cityName.append(li);
            
        }
        if(!entry) {
            return;
        }
    }

    stringify()

    function stringify() {
        var city = document.querySelector(".citySearch").value;

        if (city !== "") {
            console.log("Bro, where you at?");

            city = $("#cityList").val().trim();
            cityList.unshift(city);
            var cityListStorage = JSON.stringify(cityList);
            console.log(cityListStorage);
            localStorage.setItem("cities", cityListStorage);
        }
        aarayify();
    }

})
