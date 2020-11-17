var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

var forecastArray = [3, 11, 19, 27, 35];

$('#search-btn').on('click', function() {

    var cityName = $('#search-input').val();

    var recentCity = $('<button>').text(cityName);
    recentCity.addClass('list-group-item list-group-item-action');
    $('.recent-list').prepend(recentCity);


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
        $('#temp').text('Temperature: ' + cityTemp);

        var cityHumidity = response.main.humidity;
        $('#humidity').text('Humidity: ' + cityHumidity + '%');

        var windSpeed = response.wind.speed;
        $('#wind-speed').text('Wind Speed: ' + windSpeed + ' MPH');

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
            if (parseInt(uvIndex) <= 4) {
                $('#uv-index').attr('style', 'background-color:lightgreen');
            }
            else if (4 < parseInt(uvIndex) && parseInt(uvIndex) < 8) {
                $('#uv-index').attr('style', 'background-color:orange');
            }
            else if (parseInt(uvIndex) >= 8) {
                $('#uv-index').attr('style', 'background-color:lightcoral');
            }

            // saving current weather card info to local storage
            var currentCardInfo = {
                city: cityDisplayed,
                temp: cityTemp,
                humidity: cityHumidity,
                wSpeed: windSpeed,
                uv: uvIndex
            };
            localStorage.setItem('current card:'+cityName, JSON.stringify(currentCardInfo));
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
            $('#fc-temp'+day).text('Temp: ' + fcTemp);

            var fcHumid = res2.list[day].main.humidity;
            $('#fc-humid'+day).text('Humidity: ' + fcHumid + '%');

            var fcCardInfo = {
                day: fcDay,
                icon: fcIcon,
                temp: fcTemp,
                humidity: fcHumid
            }

            localStorage.setItem('FC'+cityName+day, JSON.stringify(fcCardInfo));

        }
    });

});

$('.recent-list').on('click', function(event) {
    event.preventDefault();
    var targetCity = $(this).text();
    console.log(targetCity);

    var cwContent = JSON.parse(localStorage.getItem('current card:'+targetCity));
    console.log(cwContent);
    $('#city-display').text(cwContent.city + ' (' + date + ')');
    $('#temp').text('Temperature: ' + cwContent.temp);
    $('#humidity').text('Humidity: ' + cwContent.humidity + '%');
    $('#wind-speed').text('Wind Speed: ' + cwContent.wSpeed + ' MPH');
    $('#uv-index').text('UV Index: ' + cwContent.uv);

    for (day of forecastArray) {
        var fcContent = JSON.parse(localStorage.getItem('FC'+targetCity+day));
        console.log(fcContent);
        $('.forecast-'+day).text(fcContent.day);
        $('#icon-'+day).attr('src', fcContent.icon);
        $('#fc-temp'+day).text('Temp: ' + fcContent.temp);
        $('#fc-humid'+day).text('Humidity: ' + fcContent.humidity + '%');
    }
});

// function renderRecentSearch() {
//     var cwContent = JSON.parse(localStorage.getItem('current card:'+targetCity));
//     $('#city-display').text(cwContent.cityDisplayed + ' (' + date + ')');
//     $('#temp').text('Temperature: ' + cwContent.cityTemp);
//     $('#humidity').text('Humidity: ' + cwContent.cityHumidity + '%');
//     $('#wind-speed').text('Wind Speed: ' + cwContent.windSpeed + ' MPH');
//     $('#uv-index').text('UV Index: ' + cwContent.uvIndex);

//     for (day of forecastArray) {
//         var fcContent = JSON.parse(localStorage.getItem('FC'+targetCity+day));
//         $('.forecast-'+day).text(fcContent.fcDay);
//         $('#icon-'+day).attr('src', fcContent.fcIcon);
//         $('#fc-temp'+day).text('Temp: ' + fcContent.fcTemp);
//         $('#fc-humid'+day).text('Humidity: ' + fcContent.fcHumid + '%');
//     }

// }
