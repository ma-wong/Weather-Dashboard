

$('#search-btn').on('click', function() {
    var cityName = $('#search-input').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=b358465e5aa355de6ef4b2a790684722';


    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);

        var cityDisplayed = response.name;
        $('#city-display').text(cityDisplayed);

        var cityTemp = response.main.temp;
        $('#weather-details').text('Temperature: ' + cityTemp);

        var cityHumidity = $('<p>').text(response.main.humidity);
        console.log(cityHumidity);
        $('.weather-card').append('Humidity: ' + cityHumidity + '%');

        var windSpeed = $('<p>').text(response.wind.speed);
        $('.weather-card').append('Wind Speed: ' + windSpeed + 'MPH');

    });
});
