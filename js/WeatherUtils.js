//const apiKey = "086a7ce659b64ddca3893256ba692493";
//const apiKey = "1881e2081d184c169dbc7b8112fa2a04";
const weatherIconUrl = "https://www.weatherbit.io/static/img/icons/";

function getCityName(cityName){
    const cityNames = [
        { old : "REG.-BEZ. Karlsruhe", "new" :  "Karlsruhe"},
        { old: "Gautam Buddha Nagar", "new" : "NOIDA"},
        { old: "Thiruvananthapuram", "new" : "Trivandrum"},
        { old: "Bengaluru", "new" : "Bangalore"},
        { old: "REG.-BEZ. STUTTGART", "new" : "Stuttgart"},
        { old: "", "new" : "Stockholm"},
    ];
    let renamedCityEntry = cityNames.filter(entry => entry.old.toLowerCase() === cityName.toLowerCase());
    return renamedCityEntry.length ? renamedCityEntry[0]["new"] : cityName;
}

function loadWeather(postalCode, country){
    // const postalCode = "560048";
    //const country = "IN";
//    const weatherUrl = "https://api.weatherbit.io/v2.0/current?key=" + apiKey +
//                        "&lang=en&units=M&postal_code=" + postalCode +
//                        "&country=" + country;
//    const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey +
//                         "&lang=en&units=M&postal_code=" + postalCode +
//                         "&country=" + country +
//                         "&days=7";
//    $.ajax({
//      url: weatherForecastUrl,
//      success: success,
//      dataType: "json"
//    });
    $.ajax({
          url: "/weatherdata",
          data: "postalCode=" + postalCode + "&country=" + country,
          success: success,
          dataType: "json"
    });
}

//var methods = {
//    getWeatherData : function(postalCode, countryCode, callback){
//         const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey +
//                                 "&lang=en&units=M&postal_code=" + postalCode +
//                                 "&country=" + country +
//                                 "&days=7";
//            $.ajax({
//              url: weatherForecastUrl,
//              success: callback,
//              dataType: "json"
//            });
//    }
//}

function success(weatherData){
    if (weatherData && weatherData.data && weatherData.data.length) {
        document.getElementById("city_name").innerHTML = getCityName(weatherData.city_name); // + ", " + weatherData.country_code;
        document.getElementById("city_name").innerHTML = getCityName(weatherData.city_name); // + ", " + weatherData.country_code;
        document.getElementById("temp").innerHTML = weatherData.data[0].temp.toFixed(1) +"&deg;C";
        document.getElementById("max_temp").innerHTML = weatherData.data[0].max_temp.toFixed(1) +"&deg;";
        document.getElementById("min_temp").innerHTML = weatherData.data[0].min_temp.toFixed(1) +"&deg;";
        document.getElementById("wind_spd").innerHTML = Math.round(weatherData.data[0].wind_spd * 3.6) +" km/h";
        document.getElementById("ob_time").innerHTML = getLocalTime(weatherData.timezone);
        document.getElementById("weatherDescription").innerHTML = weatherData.data[0].weather.description;
        document.getElementById("weatherIcon").src =  weatherIconUrl + weatherData.data[0].weather.icon + ".png";

        for(var index=1;index<7;index++) {
            document.getElementById("day" + index).innerHTML = getWeekday(weatherData.data[index].ts);
            document.getElementById("temp" + index).innerHTML = weatherData.data[index].temp+"&deg;";
        }
    }
}

function getLocalTime(timeZone){
    let options = {
        timeZone: timeZone,
        weekday: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      },
      formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date());
}

function getWeekday(unixTimestamp){
    // Days array
    var days_arr = ['Sun', 'Mon','Tue', 'Wed','Thu', 'Fri','Sat'];
     // Convert timestamp to milliseconds
    var date = new Date(unixTimestamp*1000);
     // Weekday
    return days_arr[date.getDay()];
}

//function convertStampDate(unixTimestamp){
//    // Months array
//    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//    // Days array
//    var days_arr = ['Sun', 'Mon','Tue', 'Wed','Thu', 'Fri','Sat'];
//    // Convert timestamp to milliseconds
//    var date = new Date(unixTimestamp*1000);
//    // Year
//    var year = date.getFullYear();
//    // Month
//    var month = months_arr[date.getMonth()];
//    // Day
//    var day = date.getDate();
//    // Weekday
//    var weekday = days_arr[date.getDay()];
//    // Display date time in MM-dd-yyyy h:m:s format
//    var fullDate = weekday + ', ' + month+' '+day+'-'+year; //+''+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//    return fullDate;
//}

//module.exports = methods;