//const apiKey = "apiKey";
//const apiKey = "apiKey";
const weatherIconUrl = "https://www.weatherbit.io/static/img/icons/";

function getCityName(cityName){
    const cityNames = [
        { old : "REG.-BEZ. Karlsruhe", "new" :  "Karlsruhe"},
        { old: "Gautam Buddha Nagar", "new" : "NOIDA"},
        { old: "DĀDRI", "new" : "NOIDA"},
        { old: "ZAIDPUR", "new" : "Lucknow"},
        { old: "URAN", "new" : "Mumbai"},
        { old: "PĪLIBHĪT", "new" : "Ghaziabad"},
        { old: "Thiruvananthapuram", "new" : "Trivandrum"},
        { old: "Bengaluru", "new" : "Bangalore"},
        { old: "REG.-BEZ. STUTTGART", "new" : "Stuttgart"},
        { old: "", "new" : "Stockholm"},
        { old: "Wellesbourne Mountford", "new" : "Stratford"}
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

        $.ajax({
              url: "/weatherdataforecast",
              data: "postalCode=" + postalCode + "&country=" + country,
              success: successForecast,
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
        document.getElementById("city_name").innerHTML = getCityName(weatherData.data[0].city_name) + ", " + weatherData.data[0].country_code;
        document.getElementById("temp").innerHTML = weatherData.data[0].temp.toFixed(1) +"&deg;C";
        document.getElementById("wind_spd").innerHTML = Math.round(weatherData.data[0].wind_spd * 3.6) +" km/h";
        document.getElementById("wind_dir").innerHTML = weatherData.data[0].wind_cdir;
        document.getElementById("weatherDescription").innerHTML = weatherData.data[0].weather.description;
        document.getElementById("weatherIcon").src =  "../icon/" + weatherData.data[0].weather.icon + ".png";
        document.getElementById("uv").innerHTML = "uv " + weatherData.data[0].uv.toFixed(1);

        //icons
        document.getElementById("windIcon").className = "wi wi-wind wi-towards-"+ weatherData.data[0].wind_cdir.toLowerCase();

        setBackColor(weatherData.data[0].pod);
        updateTime(weatherData.data[0].timezone);
    }
}

function successForecast(weatherData){
    if (weatherData && weatherData.data && weatherData.data.length) {
          document.getElementById("max_temp").innerHTML = weatherData.data[0].max_temp.toFixed(0);
          document.getElementById("min_temp").innerHTML = weatherData.data[0].min_temp.toFixed(0);
          document.getElementById("moon_phase").className = "wi " + getMoonPhase(weatherData.data[0].moon_phase_lunation);
          document.getElementById("sunrise").innerHTML = getRegionalTime(weatherData.data[0].sunrise_ts, weatherData.timezone);
          document.getElementById("sunset").innerHTML = getRegionalTime(weatherData.data[0].sunset_ts, weatherData.timezone);
          document.getElementById("precip").innerHTML = weatherData.data[0].pop + "%";

        //for next 3 days
        for(var index=1;index<4;index++) {
            document.getElementById("day" + index).innerHTML = getWeekday(weatherData.data[index].ts);
            document.getElementById("mintemp" + index).innerHTML = weatherData.data[index].min_temp.toFixed(0);
            document.getElementById("maxtemp" + index).innerHTML = weatherData.data[index].max_temp.toFixed(0);
            document.getElementById("weatherForecastIcon" + index).src = "../icon/" + weatherData.data[index].weather.icon + ".png";
        }

    }
}

function updateTime(timezone) {
  document.getElementById("current_time").innerHTML = getLocalTime(timezone);
  var t = setTimeout(function(){ updateTime(timezone) }, 1000); /* setting timer */
}

function getMoonPhase(lunation){
    let index = Math.round(lunation * 28);
    let phaseMap =[
        "wi-moon-new",
        "wi-moon-waxing-crescent-1",
        "wi-moon-waxing-crescent-2",
        "wi-moon-waxing-crescent-3",
        "wi-moon-waxing-crescent-4",
        "wi-moon-waxing-crescent-5",
        "wi-moon-waxing-crescent-6",
        "wi-moon-first-quarter",
        "wi-moon-waxing-gibbous-1",
        "wi-moon-waxing-gibbous-2",
        "wi-moon-waxing-gibbous-3",
        "wi-moon-waxing-gibbous-4",
        "wi-moon-waxing-gibbous-5",
        "wi-moon-waxing-gibbous-6",
        "wi-moon-full",
        "wi-moon-waning-gibbous-1",
        "wi-moon-waning-gibbous-2",
        "wi-moon-waning-gibbous-3",
        "wi-moon-waning-gibbous-4",
        "wi-moon-waning-gibbous-5",
        "wi-moon-waning-gibbous-6",
        "wi-moon-third-quarter",
        "wi-moon-waning-crescent-1",
        "wi-moon-waning-crescent-2",
        "wi-moon-waning-crescent-3",
        "wi-moon-waning-crescent-4",
        "wi-moon-waning-crescent-5",
        "wi-moon-waning-crescent-6"
    ];

    return phaseMap[index];
}

function setBackColor(pod){
    if (pod === 'd')
    {
        document.getElementById("tile").style['background'] = '#000000';//"#7abcff";
    }
    else
    {
        document.getElementById("tile").style['background'] = '#000000';//''#383938';
    }
}

function getLocalTime(timeZone){
//    let options = {
//        timeZone: timeZone,
//        weekday: 'short',
//        year: 'numeric',
//        month: 'numeric',
//        day: 'numeric',
//        hour: 'numeric',
//        minute: 'numeric'
//      },
    var options = { timeZone: timeZone, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' ,
    hour: 'numeric', minute: 'numeric', second: 'numeric'};
    var formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date());
}

function getRegionalTime(unixTimestamp, timeZone){
    //let unix_timestamp = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unixTimestamp * 1000);
//    var year = date.getYear();
//    var month = date.getMonth();
//    var day = date.getDay();
//    // Hours part from the timestamp
//    var hours = date.getHours();
//    // Minutes part from the timestamp
//    var minutes = "0" + date.getMinutes();
//    // Seconds part from the timestamp
//    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // let utcDate = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

   // console.log('Given IST datetime: ' + date);

    let intlDateObj = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12:false,
        timeZone: timeZone
    });
    let formattedTime = intlDateObj.format(date);

    return formattedTime;
}

function getWeekday(unixTimestamp){
    // Days array
    var days_arr = ['Sun', 'Mon','Tue', 'Wed','Thu', 'Fri','Sat'];
     // Convert timestamp to milliseconds
    var date = new Date(unixTimestamp*1000);
     // Weekday
    return days_arr[date.getDay()];
}