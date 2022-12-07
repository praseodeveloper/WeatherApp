// Create a class for the element
class WeatherInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.currentWeather = document.createElement("div");

    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "weather");
    this.wrapper.setAttribute("id", "tile");

    this.row1 = document.createElement("div");
    this.row1.setAttribute("class", "row1");

    let postalCode = this.getAttribute("postalCode");
    let country = this.getAttribute("country");

    $.ajax({
      url: "/weatherdata",
      data: "postalCode=" + postalCode + "&country=" + country,
      success: success.bind(this),
      dataType: "json",
    });

    function updateTime(timezone, currentTimeElement) {
      const currentTime = getLocalTime(timezone);
      if (currentTimeElement) {
        currentTimeElement.textContent = currentTime;
      }
      var t = setTimeout(function () {
        updateTime(timezone, currentTimeElement);
      }, 1000); /* setting timer */
    }

    function getLocalTime(timeZone) {
      var options = {
        timeZone: timeZone,
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      var formatter = new Intl.DateTimeFormat([], options);

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

    function getRegionalTime(unixTimestamp, timeZone){
      var date = new Date(unixTimestamp * 1000);

      let intlDateObj = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12:false,
        timeZone: timeZone
      });
      let formattedTime = intlDateObj.format(date);

      return formattedTime;
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

    function success(weatherData) {
      if (weatherData && weatherData.data && weatherData.data.length) {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const city_name = document.createElement("div");
        city_name.setAttribute("class", "city_name col-12");
        city_name.textContent = `${weatherData.data[0].city_name}, ${weatherData.data[0].country_code}`;

        const clearFix = document.createElement("div");
        clearFix.setAttribute("class", "clearfix");

        const currentTime = document.createElement("div");
        currentTime.setAttribute("class", "currentTime col-12");
        updateTime(weatherData.data[0].timezone, currentTime);

        const weatherDescription = document.createElement("div");
        weatherDescription.setAttribute("class", "weatherDescription");
        weatherDescription.textContent =
          weatherData.data[0].weather.description;

        const weatherIcon = document.createElement("div");
        weatherIcon.setAttribute("class", "col-4 iconCurrent");
        this.row1.appendChild(weatherIcon);

        const weatherImg = document.createElement("img");
        weatherImg.setAttribute("align", "center");
        weatherImg.setAttribute("id", "weatherIcon");
        weatherImg.setAttribute("src", `../icon/${weatherData.data[0].weather.icon}.png`);
        weatherIcon.appendChild(weatherImg);

        this.currentWeather.setAttribute("class", "col-4 currentWeather");
        const currentTemp = document.createElement("div");
        currentTemp.setAttribute("class", "currentTemp");
        currentTemp.innerHTML = `${weatherData.data[0].temp.toFixed(1)}&deg;C`;
        this.currentWeather.appendChild(currentTemp);

        const containerLimit = document.createElement("div");
        containerLimit.setAttribute("class", "containerLimit");

        const uv = document.createElement("label");
        uv.setAttribute("class", "uv");
        uv.setAttribute("id", "uv");
        uv.textContent = "uv " + weatherData.data[0].uv.toFixed(1);
        containerLimit.appendChild(uv);
        this.currentWeather.appendChild(uv);

        this.row1.appendChild(this.currentWeather);

        // Apply external styles to the shadow dom
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../css/styles.css");

        const linkElem1 = document.createElement("link");
        linkElem1.setAttribute("rel", "stylesheet");
        linkElem1.setAttribute("href", "../css/weather-icons.min.css");

        const linkElem2 = document.createElement("link");
        linkElem2.setAttribute("rel", "stylesheet");
        linkElem2.setAttribute("href", "../css/weather-icons-wind.css");

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(linkElem1);
        shadow.appendChild(linkElem2);

        shadow.appendChild(this.wrapper);

        this.wrapper.appendChild(city_name);
        this.wrapper.appendChild(clearFix);
        this.wrapper.appendChild(currentTime);
        this.wrapper.appendChild(weatherDescription);
        this.wrapper.appendChild(this.row1);

        $.ajax({
          url: "/weatherdataforecast",
          data: "postalCode=" + postalCode + "&country=" + country,
          success: successForecast.bind(this),
          dataType: "json"
        });
      }
    }

    function successForecast(weatherData){
      if (weatherData && weatherData.data && weatherData.data.length) {
        const containerLimit = document.createElement("div");
        containerLimit.setAttribute("class", "containerLimit");

        const limitCurrent = document.createElement("div");
        limitCurrent.setAttribute("class", "limitCurrent");
        containerLimit.appendChild(limitCurrent);

        const maxTemp = document.createElement("label");
        var max = weatherData.data[0].max_temp;
        max = (max > -1 && max < 0) ? 0 : max.toFixed(0);
        maxTemp.textContent = max;
        limitCurrent.appendChild(maxTemp);
        const separator = document.createElement("label");
        separator.setAttribute("class", "separator");
        separator.textContent = " | ";
        limitCurrent.appendChild(separator);
        const minTemp = document.createElement("label");
        var min = weatherData.data[0].min_temp;
        min = (min > -1 && min < 0) ? 0 : min.toFixed(0);
        minTemp.textContent = min;
        limitCurrent.appendChild(minTemp);

        this.currentWeather.insertBefore(containerLimit, this.currentWeather.lastElementChild);

        const rain = document.createElement("div");
        rain.setAttribute("class", "col-4 rain");

        const rainGif = document.createElement("img");
        rainGif.setAttribute("class", "rainGif");
        rainGif.setAttribute("src", "https://media.giphy.com/media/4ZgLV2kGCmbKPEJVCl/giphy.gif");

        const precip = document.createElement("label");
        precip.textContent = weatherData.data[0].pop + "%";

        rain.appendChild(rainGif);
        rain.appendChild(precip);

        this.row1.appendChild(rain);

        const clearFix = document.createElement("div");
        clearFix.setAttribute("class", "clearfix");

        this.wrapper.appendChild(clearFix);

        var row2 = document.createElement("div");
        row2.setAttribute("class", "row2");

        var forecast1 = document.createElement("div");
        forecast1.setAttribute("class", "col-4 forecastEntry");

        var forecastDay1 = document.createElement("div");
        forecastDay1.setAttribute("class", "forecastDay");
        forecastDay1.textContent = getWeekday(weatherData.data[1].ts);
        forecast1.appendChild(forecastDay1);

        var forecastDay1Limit = document.createElement("div");
        forecastDay1Limit.setAttribute("class", "forecastDayLimit");

        var maxTemp1 = document.createElement("label");
        var value = weatherData.data[1].max_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        maxTemp1.textContent = value;
        forecastDay1Limit.appendChild(maxTemp1);

        const separator1 = document.createElement("label");
        separator1.setAttribute("class", "separator");
        separator1.textContent = " | ";
        forecastDay1Limit.appendChild(separator1);

        var minTemp1 = document.createElement("label");
        value = weatherData.data[1].min_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        minTemp1.textContent = value;
        forecastDay1Limit.appendChild(minTemp1);

        forecast1.appendChild(forecastDay1Limit);

        var forecastDayIconDiv = document.createElement("div");
        var day1Icon = document.createElement("img");
        day1Icon.setAttribute("class", "forecastDayIcon");
        day1Icon.setAttribute("src", "../icon/" + weatherData.data[1].weather.icon + ".png");

        forecastDayIconDiv.appendChild(day1Icon);

        forecast1.appendChild(forecastDayIconDiv);
        row2.appendChild(forecast1);

        var forecast2 = document.createElement("div");
        forecast2.setAttribute("class", "col-4 forecastEntry");

        var forecastDay2 = document.createElement("div");
        forecastDay2.setAttribute("class", "forecastDay");
        forecastDay2.textContent = getWeekday(weatherData.data[2].ts);
        forecast2.appendChild(forecastDay2);

        var forecastDay2Limit = document.createElement("div");
        forecastDay2Limit.setAttribute("class", "forecastDayLimit");

        var maxTemp2 = document.createElement("label");
        var value = weatherData.data[2].max_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        maxTemp2.textContent = value;
        forecastDay2Limit.appendChild(maxTemp2);

        const separator2 = document.createElement("label");
        separator2.setAttribute("class", "separator");
        separator2.textContent = " | ";
        forecastDay2Limit.appendChild(separator2);

        var minTemp2 = document.createElement("label");
        value = weatherData.data[2].min_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        minTemp2.textContent = value;
        forecastDay2Limit.appendChild(minTemp2);

        forecast2.appendChild(forecastDay2Limit);

        var forecastDay2IconDiv = document.createElement("div");
        var day2Icon = document.createElement("img");
        day2Icon.setAttribute("class", "forecastDayIcon");
        day2Icon.setAttribute("src", "../icon/" + weatherData.data[2].weather.icon + ".png");

        forecastDay2IconDiv.appendChild(day2Icon);

        forecast2.appendChild(forecastDay2IconDiv);
        row2.appendChild(forecast2);

        var forecast3 = document.createElement("div");
        forecast3.setAttribute("class", "col-4 forecastEntry");

        var forecastDay3 = document.createElement("div");
        forecastDay3.setAttribute("class", "forecastDay");
        forecastDay3.textContent = getWeekday(weatherData.data[3].ts);
        forecast3.appendChild(forecastDay3);

        var forecastDay3Limit = document.createElement("div");
        forecastDay3Limit.setAttribute("class", "forecastDayLimit");

        var maxTemp3 = document.createElement("label");
        var value = weatherData.data[3].max_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        maxTemp3.textContent = value;
        forecastDay3Limit.appendChild(maxTemp3);

        const separator3 = document.createElement("label");
        separator3.setAttribute("class", "separator");
        separator3.textContent = " | ";
        forecastDay3Limit.appendChild(separator3);

        var minTemp3 = document.createElement("label");
        value = weatherData.data[3].min_temp;
        value = (value < 0 && value > -1) ? 0 : value.toFixed(0);
        minTemp3.textContent = value;
        forecastDay3Limit.appendChild(minTemp3);

        forecast3.appendChild(forecastDay3Limit);

        var forecastDay3IconDiv = document.createElement("div");
        var day3Icon = document.createElement("img");
        day3Icon.setAttribute("class", "forecastDayIcon");
        day3Icon.setAttribute("src", "../icon/" + weatherData.data[3].weather.icon + ".png");

        forecastDay3IconDiv.appendChild(day3Icon);

        forecast3.appendChild(forecastDay3IconDiv);
        row2.appendChild(forecast3);

        this.wrapper.appendChild(row2);

        const clearFix2 = document.createElement("div");
        clearFix2.setAttribute("class", "clearfix");

        this.wrapper.appendChild(clearFix2);

        const row3 = document.createElement("div");
        row3.setAttribute("class", "row3");

        const sunEntry = document.createElement("div");
        sunEntry.setAttribute("class", "col-4 sunEntry");

        const sunrise = document.createElement("div");
        sunrise.setAttribute("class","sunriseSunset");
        const sunriseIcon = document.createElement("i");
        sunriseIcon.setAttribute("class","sunIcon wi wi-sunrise");
        sunriseIcon.setAttribute("id", "sunriseIcon");
        const sunriseTime = document.createElement("div");
        sunriseTime.setAttribute("class", "sunTime");
        sunriseTime.textContent = getRegionalTime(weatherData.data[0].sunrise_ts, weatherData.timezone);
        sunrise.appendChild(sunriseIcon);
        sunrise.appendChild(sunriseTime);
        sunEntry.appendChild(sunrise);

        const empty = document.createElement("div");
        empty.setAttribute("class", "empty");
        sunEntry.appendChild(empty);

        const sunset = document.createElement("div");
        sunset.setAttribute("class","sunriseSunset");
        const sunsetIcon = document.createElement("i");
        sunsetIcon.setAttribute("class","sunIcon wi wi-sunset");
        sunsetIcon.setAttribute("id", "sunsetIcon");
        const sunsetTime = document.createElement("div");
        sunsetTime.setAttribute("class", "sunTime");
        sunsetTime.textContent = getRegionalTime(weatherData.data[0].sunset_ts, weatherData.timezone);
        sunset.appendChild(sunsetIcon);
        sunset.appendChild(sunsetTime);
        sunEntry.appendChild(sunset);

        row3.appendChild(sunEntry);

        const moonEntry = document.createElement("div");
        moonEntry.setAttribute("class", "col-4 moonEntry");

        const moon = document.createElement("div");
        const i1 = document.createElement("i");
        i1.setAttribute("class", "moonRing wi wi-moon-new");
        i1.setAttribute("id", "moon_ring");
        moon.appendChild(i1);
        const i2 = document.createElement("i");
        i2.setAttribute("class", "wi " + getMoonPhase(weatherData.data[0].moon_phase_lunation));
        moon.appendChild(i2);
        moonEntry.appendChild(moon);
        row3.appendChild(moonEntry);

        this.wrapper.appendChild(row3);
      }
    }
  }
}

// Define the new element
customElements.define("weather-info", WeatherInfo);
