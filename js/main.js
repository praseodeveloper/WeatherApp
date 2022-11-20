// Create a class for the element
class WeatherInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.currentWeather = document.createElement("div");

    let postalCode = this.getAttribute("postalCode");
    let country = this.getAttribute("country");

    $.ajax({
      url: "/weatherdata",
      data: "postalCode=" + postalCode + "&country=" + country,
      success: success.bind(this),
      dataType: "json",
    });

    $.ajax({
      url: "/weatherdataforecast",
      data: "postalCode=" + postalCode + "&country=" + country,
      success: successForecast.bind(this),
      dataType: "json"
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

    function success(weatherData) {
      if (weatherData && weatherData.data && weatherData.data.length) {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "weather");
        wrapper.setAttribute("id", "tile");

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

        const row1 = document.createElement("div");
        row1.setAttribute("class", "row1");

        const weatherIcon = document.createElement("div");
        weatherIcon.setAttribute("class", "col-4 iconCurrent");
        row1.appendChild(weatherIcon);
        
        const weatherImg = document.createElement("img");
        weatherImg.setAttribute("align", "center");
        weatherImg.setAttribute("id", "weatherIcon");
        weatherImg.setAttribute("src", `../icon/${weatherData.data[0].weather.icon}.png`);
        weatherIcon.appendChild(weatherImg);

        this.currentWeather.setAttribute("class", "col-4 currentWeather");
        const currentTemp = document.createElement("div");
        currentTemp.setAttribute("class", "currentTemp");
        currentTemp.textContent = `${weatherData.data[0].temp.toFixed(1)}C`;
        this.currentWeather.appendChild(currentTemp);

        const containerLimit = document.createElement("div");
        containerLimit.setAttribute("class", "containerLimit");

        const uv = document.createElement("label");
        uv.setAttribute("class", "uv");
        uv.setAttribute("id", "uv");
        uv.textContent = "uv " + weatherData.data[0].uv.toFixed(1);
        containerLimit.appendChild(uv);
        this.currentWeather.appendChild(uv);

        row1.appendChild(this.currentWeather);

        // Apply external styles to the shadow dom
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../css/styles.css");

        // Attach the created elements to the shadow dom
        shadow.appendChild(linkElem);
        shadow.appendChild(wrapper);

        wrapper.appendChild(city_name);
        wrapper.appendChild(clearFix);
        wrapper.appendChild(currentTime);
        wrapper.appendChild(weatherDescription);
        wrapper.appendChild(row1);
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
      }
    }
  }
}

// Define the new element
customElements.define("weather-info", WeatherInfo);
