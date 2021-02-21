// Reference : https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
const template = document.createElement('template');
template.innerHTML = `
<div class="wrapper">
    <div class="weather">
        <div class="cont1">
            <div class="city_name" id="city_name"></div>
            <div class="ob_time" id="ob_time"></div>
        </div>
        <div class="clearfix"></div>
        <div class="cont">
            <div class="icon">
                <img id="weatherIcon">
            </div>
            <div class="temp">
                <div class="current" id="temp"></div>
                <div class="limit">
                    Max:<label id="max_temp"></label>
                </div>
                <div class="limit">
                    Min:<label id="min_temp"></label>
                </div>
                <div class="limit">
                    Wind:<label id="wind_spd"></label>
                </div>
            </div>
        </div>
        <div class="weatherDescription" id="weatherDescription"></div>
        <div class="clearfix"></div>
        <div class="forecastContent">
            <div class="forecastEntry">
                <div class="forecastEntry" id="day1"></div>
                <div class="forecastEntry"id="temp1"></div>
            </div>
            <div class="forecastEntry">
                <div class="forecastEntry" id="day2"></div>
                <div class="forecastEntry"id="temp2"></div>
            </div>
            <div class="forecastEntry">
                <div class="forecastEntry" id="day3"></div>
                <div class="forecastEntry"id="temp3"></div>
            </div>
            <div class="forecastEntry">
                <div class="forecastEntry" id="day4"></div>
                <div class="forecastEntry"id="temp4"></div>
            </div>
            <div class="forecastEntry">
                <div class="forecastEntry" id="day5"></div>
                <div class="forecastEntry"id="temp5"></div>
            </div>
            <div class="forecastEntry">
                <div class="forecastEntry" id="day6"></div>
                <div class="forecastEntry"id="temp6"></div>
            </div>
        </div>
    </div> <!-- weather -->
</div> <!-- wrapper -->
`;

document.body.appendChild(template.content);