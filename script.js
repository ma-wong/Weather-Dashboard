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

        var fc1 = response.list[3].dt_txt;
        $('#forecast-1').text(fc1);

        var fc2 = response.list[11].dt_txt;
        $('#forecast-2').text(fc2);
        
        var fc3 = response.list[19].dt_txt;
        $('#forecast-3').text(fc3);

        var fc4 = response.list[27].dt_txt;
        $('#forecast-4').text(fc4);

        var fc5 = response.list[35].dt_txt;
        $('#forecast-5').text(fc5);

        var iconCode1 = response.list[3].weather[0].icon;
        var icon1 = 'http://openweathermap.org/img/w/' + iconCode1 + '.png';
        $('#icon-1').attr('src', icon1);

        var iconCode2 = response.list[11].weather[0].icon;
        var icon2 = 'http://openweathermap.org/img/w/' + iconCode2 + '.png';
        $('#icon-2').attr('src', icon2);

        var iconCode3 = response.list[19].weather[0].icon;
        var icon3 = 'http://openweathermap.org/img/w/' + iconCode3 + '.png';
        $('#icon-3').attr('src', icon3);

        var iconCode4 = response.list[27].weather[0].icon;
        var icon4 = 'http://openweathermap.org/img/w/' + iconCode4 + '.png';
        $('#icon-4').attr('src', icon4);

        var iconCode5 = response.list[35].weather[0].icon;
        var icon5 = 'http://openweathermap.org/img/w/' + iconCode5 + '.png';
        $('#icon-5').attr('src', icon5);

        var fcTemp1 = response.list[3].main.temp;
        $('#fc-temp1').text('Temp: ' + fcTemp1);

        var fcTemp2 = response.list[11].main.temp;
        $('#fc-temp2').text('Temp: ' + fcTemp2);

        var fcTemp3 = response.list[19].main.temp;
        $('#fc-temp3').text('Temp: ' + fcTemp3);

        var fcTemp4 = response.list[27].main.temp;
        $('#fc-temp4').text('Temp: ' + fcTemp4);

        var fcTemp5 = response.list[35].main.temp;
        $('#fc-temp5').text('Temp: ' + fcTemp5);

        var fcHumid1 = response.list[3].main.humidity;
        $('#fc-humid1').text('Humidity: ' + fcHumid1 + '%');

        var fcHumid2 = response.list[11].main.humidity;
        $('#fc-humid2').text('Humidity: ' + fcHumid2 + '%');

        var fcHumid3 = response.list[19].main.humidity;
        $('#fc-humid3').text('Humidity: ' + fcHumid3 + '%');

        var fcHumid4 = response.list[27].main.humidity;
        $('#fc-humid4').text('Humidity: ' + fcHumid4 + '%');

        var fcHumid5 = response.list[35].main.humidity;
        $('#fc-humid5').text('Humidity: ' + fcHumid5 + '%');


    });

});
