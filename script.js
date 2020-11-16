var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

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

        var uvIndex = response;
        $('#uv-index').text('UV Index: ' + uvIndex);


        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvIndexURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon +'&appid=b358465e5aa355de6ef4b2a790684722';

        $.ajax({
            url: uvIndexURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            var uvIndex = response.value;
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

        });
    });

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        var forecastArray = [3, 11, 19, 27, 35];

        for (day of forecastArray) {

            var fcDay = response.list[day].dt_txt;
            domDay = $('.forecast-'+day);
            domDay.text(fcDay);

            var iconCode = response.list[day].weather[0].icon;
            var icon = 'http://openweathermap.org/img/w/' + iconCode + '.png';
            $('#icon-'+day).attr('src', icon);

            var fcTemp = response.list[day].main.temp;
            $('#fc-temp'+day).text('Temp: ' + fcTemp);

            var fcHumid = response.list[day].main.humidity;
            $('#fc-humid'+day).text('Humidity: ' + fcHumid + '%');
        }
    });

});
