var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

$('#search-btn').on('click', function() {
    var cityName = $('#search-input').val();
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
    });

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
    });

});
