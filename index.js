const express = require('express')
const app = express()
const port = 3000
const https = require('https');
const key = require('./js/donotdelete');

//const axios = require('axios');
const path = require('path');
const cacheValidity = 43200000; // for testing, once every 12 hrs, use with port 3000
//const cacheValidity = 1800000; // for real, once every 30 min, use with port 80

const apiKey = key.apiKey;

//---------------------------------------------------------------------------------------------------------
["/", "/index.html"].forEach(function(entryPoint){
    app.get(entryPoint, (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
});

app.get('^/js/:js(*.js)', (req, res) => {
   res.sendFile(path.join(__dirname + '/js/' + req.params.js));
});

app.get('/weatherdata', (req, res) => {
    getWeatherData(req.query.postalCode, req.query.country, function(weatherData){
        res.send(weatherData);
    });
});

app.get('/weatherdataforecast', (req, res) => {
    getWeatherDataForecast(req.query.postalCode, req.query.country, function(weatherData){
        res.send(weatherData);
    });
});

app.get('^/html/:html(weather*.html)', (req, res) => {
   res.sendFile(path.join(__dirname + '/html/' + req.params.html));
});

app.get('^/icon/:icon(*.png)', (req, res) => {
   res.sendFile(path.join(__dirname + '/icon/' + req.params.icon));
});

app.get('^/font/:font(weather*)', (req, res) => {
   res.sendFile(path.join(__dirname + '/font/' + req.params.font));
});

app.get('^/mockData/:json(*.json)', (req, res) => {
   res.sendFile(path.join(__dirname + '/mockData/' + req.params.json));
});

app.get('^/css/:css(*.css)', (req, res) => {
   res.sendFile(path.join(__dirname + '/css/' + req.params.css));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//------------------------------------------------------------------------------

var cachedWeatherData = {};
var cachedWeatherDataForecast = {};

function getWeatherData(postalCode, country, callback){
     let cachedData = cachedWeatherData[postalCode];
     let currentTimestamp = new Date().getTime();

     if(cachedData && (currentTimestamp - cachedData.ts) < cacheValidity)
     {
            callback(cachedData.data);
     }
     else
     {
        const currentWeatherUrl = "https://api.weatherbit.io/v2.0/current?key=" + apiKey +
                                 "&lang=en&units=M&postal_code=" + postalCode +
                                 "&country=" + country;

         console.log("call to weatherbit for current");
         https.get(currentWeatherUrl, (res) => {
               var { statusCode } = res;
               var contentType = res.headers['content-type'];
               let error;
               if (statusCode !== 200) {
                 error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
               }
               else if (!/^application\/json/.test(contentType))
               {
                 error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
               }
               if (error)
               {
                 console.error(error.message);
                 // consume response data to free up memory
                 res.resume();
               }
               res.setEncoding('utf8');
               let rawData = '';
               res.on('data', (chunk) => {
                 rawData += chunk;
               });
               res.on('end', () => {
                 try {
                   const parsedData = JSON.parse(rawData);
                   callback(parsedData);
                   // Update cache
                   cachedWeatherData[postalCode] = {
                        ts: new Date().getTime(),
                        data: parsedData
                    };
                   // console.log(parsedData);
                 } catch (e) {
                   console.error(e.message);
                 }
               });
         });
     }
}

function getWeatherDataForecast(postalCode, country, callback)
{
     let cachedData = cachedWeatherDataForecast[postalCode];
     let currentTimestamp = new Date().getTime();

     if(cachedData && (currentTimestamp - cachedData.ts) < cacheValidity)
     {
            callback(cachedData.data);
     }
     else
     {
         const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey +
                                 "&lang=en&units=M&postal_code=" + postalCode +
                                 "&country=" + country +
                                 "&days=4";

         console.log("call to weatherbit for forecast");

         https.get(weatherForecastUrl, (res) => {
               var { statusCode } = res;
               var contentType = res.headers['content-type'];
               let error;
               if (statusCode !== 200) {
                 error = new Error('Request Failed.\n' +
                                   `Status Code: ${statusCode}`);
               } else if (!/^application\/json/.test(contentType)) {
                 error = new Error('Invalid content-type.\n' +
                                   `Expected application/json but received ${contentType}`);
               }
               if (error) {
                 console.error(error.message);
                 // consume response data to free up memory
                 res.resume();
               }
               res.setEncoding('utf8');
               let rawData = '';
               res.on('data', (chunk) => {
                 rawData += chunk;
               });
               res.on('end', () => {
                 try {
                   const parsedData = JSON.parse(rawData);
                   callback(parsedData);
                   // Update cache
                   cachedWeatherDataForecast[postalCode] = {
                        ts: new Date().getTime(),
                        data: parsedData
                    };
                   // console.log(parsedData);
                 } catch (e) {
                   console.error(e.message);
                 }
               });
         });
     }
}