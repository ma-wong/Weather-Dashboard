var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

var forecastArray = [3, 11, 19, 27, 35];

// render last searched city
renderLast();

// on click event for search button
$('#search-btn').on('click', function() {
    var cityName = $('#search-input').val();

    var recentCity = $('<button>').text(cityName);
    recentCity.addClass('list-group-item list-group-item-action recent-search');
    $('.recent-list').prepend(recentCity);

    getWeatherInfo(cityName);
});

// On click event for recent search buttons
$(document).on('click', '.recent-search', function(event) {
    event.preventDefault();
    var cityName = $(this).text();

    getWeatherInfo(cityName);
});

// function that ajax call weather APIs
function getWeatherInfo(cityName) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b358465e5aa355de6ef4b2a790684722';
    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=b358465e5aa355de6ef4b2a790684722';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);

        var cityDisplayed = response.name;
        $('#city-display').text(cityDisplayed + ' (' + date + ')');

        var cityTemp = response.main.temp;
        var fTemp = convertTemp(cityTemp);
        $('#temp').text('Temperature: ' + fTemp + '°F');

        var cityHumidity = response.main.humidity;
        $('#humidity').text('Humidity: ' + cityHumidity + '%');

        var windSpeed = response.wind.speed;
        $('#wind-speed').text('Wind Speed: ' + windSpeed + ' MPH');

        var cityIconCode = response.weather[0].icon;
        var cityIcon = 'http://openweathermap.org/img/w/' + cityIconCode + '.png';
        $('#city-icon').attr('src', cityIcon);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon +'&appid=b358465e5aa355de6ef4b2a790684722';

        $.ajax({
            url: uvIndexURL,
            method: 'GET'
        }).then(function(res1) {
            console.log(res1);
            var uvIndex = res1.value;
            $('#uv-index').text('UV Index: ' + uvIndex);
            console.log(parseInt(uvIndex));
            colorIndex(uvIndex);

            // saving current weather card info to local storage
            var currentCardInfo = {
                city: cityDisplayed,
                temp: fTemp,
                humidity: cityHumidity,
                wSpeed: windSpeed,
                cIcon: cityIcon,
                uv: uvIndex
            };
            localStorage.setItem('last current', JSON.stringify(currentCardInfo));
        });
    });

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function(res2) {
        console.log(res2);

        for (day of forecastArray) {
            var fcDay = res2.list[day].dt_txt;
            $('.forecast-'+day).text(fcDay);

            var iconCode = res2.list[day].weather[0].icon;
            var fcIcon = 'http://openweathermap.org/img/w/' + iconCode + '.png';
            $('#icon-'+day).attr('src', fcIcon);

            var fcTemp = res2.list[day].main.temp;
            var fTemp = convertTemp(fcTemp);
            $('#fc-temp'+day).text('Temp: ' + fTemp + '°F');

            var fcHumid = res2.list[day].main.humidity;
            $('#fc-humid'+day).text('Humidity: ' + fcHumid + '%');

            var fcCardInfo = {
                day: fcDay,
                icon: fcIcon,
                temp: fTemp,
                humidity: fcHumid
            };
            localStorage.setItem('last fc'+day, JSON.stringify(fcCardInfo));
        }
    });
}

// function to render weather info about last searched city
function renderLast() {
    var cwContent = JSON.parse(localStorage.getItem('last current'));
    if (cwContent !== null) {
        console.log(cwContent);
        $('#city-display').text(cwContent.city + ' (' + date + ')');
        $('#temp').text('Temperature: ' + cwContent.temp);
        $('#humidity').text('Humidity: ' + cwContent.humidity + '%');
        $('#wind-speed').text('Wind Speed: ' + cwContent.wSpeed + ' MPH');
        $('#city-icon').attr('src', cwContent.cIcon);
        $('#uv-index').text('UV Index: ' + cwContent.uv);

        for (day of forecastArray) {
            var fcContent = JSON.parse(localStorage.getItem('last fc'+day));
            console.log(fcContent);
            $('.forecast-'+day).text(fcContent.day);
            $('#icon-'+day).attr('src', fcContent.icon);
            $('#fc-temp'+day).text('Temp: ' + fcContent.temp);
            $('#fc-humid'+day).text('Humidity: ' + fcContent.humidity + '%');
        }
        colorIndex(cwContent.uv);
    }
}

// Function to color uv index
function colorIndex(uvIndex) {
    if (parseInt(uvIndex) <= 4) {
        $('#uv-index').attr('style', 'background-color:lightgreen');
    }
    else if (4 < parseInt(uvIndex) && parseInt(uvIndex) < 8) {
        $('#uv-index').attr('style', 'background-color:orange');
    }
    else if (parseInt(uvIndex) >= 8) {
        $('#uv-index').attr('style', 'background-color:lightcoral');
    }
}

// function to convert temp from kelvin to farenheit 
function convertTemp(temp) {
    return Math.round((temp- 273.15)*9/5+32);
}