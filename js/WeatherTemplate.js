// Reference : https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
const template = document.createElement('template');
template.innerHTML = `
<div class="wrapper">
    <div class="weather" id="tile">
            <div class="city_name" id="city_name"></div>

            <div class="clearfix"></div>

            <div class="ob_time" id="ob_time"></div>
            <div class="weatherDescription" id="weatherDescription"></div>
            <div class="icon">
                <img id="weatherIcon">
            </div>
            <div class="temp">
                <div class="current" id="temp"></div>
                <div class="rain">

                   <!--<img class="rainGif" src="https://media.giphy.com/media/hVUssDPFIp4Q2eshiE/giphy.gif">-->
                   <label id="precip"></label>
                   <img class="rainGif" src="https://media.giphy.com/media/4ZgLV2kGCmbKPEJVCl/giphy.gif">
                </div>
                <div class="limit">
                    <label id="max_temp"></label>
                    <label class="separator"> | </label>
                    <label id="min_temp"></label>
                    <label class="separator"> | </label>
                    uv index <label class="uv" id="uv"></label>
                </div>


            </div>
        <!--</div>-->

        <div class="clearfix"></div>

        <div class="forecastContent">
            <div class="forecastEntry">
                <div class="forecastDay" id="day1"></div>
                <div class = "center">
                    <label id="mintemp1"></label>
                    <label class="separator"> | </label>
                    <label id="maxtemp1"></label>
                </div>
                <div>
                   <img class ="forecastIcon" id="weatherForecastIcon1">
                </div>
            </div> <!-- forecastEntry1 -->
            <div class="forecastEntry">
                <div class="forecastDay" id="day2"></div>
                <div class = "center">
                    <label id="mintemp2"></label>
                    <label class="separator"> | </label>
                    <label id="maxtemp2"></label>
                </div>
                <div>
                  <img class="forecastIcon" id="weatherForecastIcon2">
                </div>
            </div> <!-- forecastEntry2 -->
            <div class="forecastEntry">
               <div class="forecastDay" id="day3"></div>
                <div class = "center">
                    <label id="mintemp3"></label>
                    <label class="separator"> | </label>
                    <label id="maxtemp3"></label>
                </div>
               <div>
                  <img class="forecastIcon" id="weatherForecastIcon3">
               </div>
            </div> <!-- forecastEntry3 -->
        </div> <!-- forecastContent -->

        <div class="clearfix"></div>

        <div class="cont1">
            <div class="sunEntry">
                <div class = "sunrise50">
                    <i class="sunIcon wi wi-sunrise" id="sunriseIcon"></i>
                    <div class="sun" id="sunrise"></div>
                </div>

                <div class = "sunset50">
                    <i class="sunIcon wi wi-sunset" id="sunsetIcon"></i>
                    <div class="sun" id="sunset"></div>
                </div>
            </div> <!-- sunEntry -->

            <div class="moonEntry">
                <div>
                   <i id="moon_phase"></i>
                </div>
            </div> <!-- moonEntry -->

            <div class="windEntry">
                <div class="windSpeed" id="wind_dir"></div>
                <div class = "center">
                     <i id="windIcon"></i>
                </div>
                <div class="windSpeed" id="wind_spd"></div>
            </div> <!-- windEntry -->

        </div> <!-- cont1 -->

    </div> <!-- weather -->
</div> <!-- wrapper -->
`;

document.body.appendChild(template.content);