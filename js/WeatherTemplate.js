// Reference : https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
const template = document.createElement('template');
template.innerHTML = `
<!--<div class="wrapper">-->
    <div class="weather" id="tile">
            <div class="city_name col-12" id="city_name"></div>
            <div class="clearfix"></div>
            <div class="currentTime col-12" id="current_time"></div>
            <div class="weatherDescription" id="weatherDescription"></div>

            <div class = "row1">
                <div class="col-5 iconCurrent">
                    <img id="weatherIcon">
                </div>
                <div class="col-7 currentWeather">
                    <div class="currentTemp" id="temp"></div>
                    <div class="rain">
                       <label id="precip"></label>
                       <img class="rainGif" src="https://media.giphy.com/media/4ZgLV2kGCmbKPEJVCl/giphy.gif">
                    </div>
                    <div class = "containerLimit">
                    <div class="limitCurrent">
                        <label id="max_temp"></label>
                        <label class="separator"> | </label>
                        <label id="min_temp"></label>
                        <label class="separator"> | </label>
                        <label class="uv" id="uv"></label>
                    </div>
                    <!--<div class="uv"><label id="uv"></label></div>
                    </div>-->
                </div>
            </div>

            <div class="clearfix"></div>

            <div class="row2">
                <div class="col-4 forecastEntry">
                    <div class="forecastDay" id="day1"></div>
                    <div class = "forecastDayLimit">
                        <label id="mintemp1"></label>
                        <label class="separator"> | </label>
                        <label id="maxtemp1"></label>
                    </div>
                    <div>
                       <img class ="forecastDayIcon" id="weatherForecastIcon1">
                    </div>
                </div> <!-- forecastEntry1 -->
                <div class="col-4 forecastEntry">
                    <div class="forecastDay" id="day2"></div>
                    <div class = "forecastDayLimit">
                        <label id="mintemp2"></label>
                        <label class="separator"> | </label>
                        <label id="maxtemp2"></label>
                    </div>
                    <div>
                      <img class="forecastDayIcon" id="weatherForecastIcon2">
                    </div>
                </div> <!-- forecastEntry2 -->
                <div class="col-4 forecastEntry">
                   <div class="forecastDay" id="day3"></div>
                    <div class = "forecastDayLimit">
                        <label id="mintemp3"></label>
                        <label class="separator"> | </label>
                        <label id="maxtemp3"></label>
                    </div>
                   <div>
                      <img class="forecastDayIcon" id="weatherForecastIcon3">
                   </div>
                </div> <!-- forecastEntry3 -->
            </div>

            <div class="clearfix"></div>

            <div class="row3">
                <div class="col-4 sunEntry">
                    <div class = "sunriseSunset">
                        <i class="sunIcon wi wi-sunrise" id="sunriseIcon"></i>
                        <div class="sunTime" id="sunrise"></div>
                    </div>
                    <div class="empty"></div>
                    <div class = "sunriseSunset">
                        <i class="sunIcon wi wi-sunset" id="sunsetIcon"></i>
                        <div class="sunTime" id="sunset"></div>
                    </div>
                </div> <!-- sunEntry -->

                <div class="col-4 moonEntry">
                    <div>
                       <i class = "moonRing wi wi-moon-new" id="moon_ring"></i>
                       <i id="moon_phase"></i>
                    </div>
                </div> <!-- moonEntry -->

                <div class="col-4 windEntry">
                    <div class="windDir" id="wind_dir"></div>
                   <div class = "windIcon">
                         <i id="windIcon"></i>
                    </div>
                    <div class="windSpeed" id="wind_spd"></div>
                </div> <!-- windEntry -->

            </div> <!-- containerBottom -->

            <div class="clearfix optional"></div>



    </div> <!-- weather -->
<!-- </div> wrapper -->
`;

document.body.appendChild(template.content);