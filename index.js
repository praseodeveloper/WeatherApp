const express = require('express')
const app = express()
const port = 3000
const https = require('https');
//const axios = require('axios');
const path = require('path');

//const weatherUrl = "https://api.weatherbit.io/v2.0/current?key=086a7ce659b64ddca3893256ba692493&lang=en&units=M&postal_code=76139&country=DE";

//app.get('/', (req, res) => {
//  //doWork2(function(result){ res.send(result); });
//})

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

app.get('^/html/:html(weather*.html)', (req, res) => {
   res.sendFile(path.join(__dirname + '/html/' + req.params.html));
});

app.get('^/mockData/:json(*.json)', (req, res) => {
   res.sendFile(path.join(__dirname + '/mockData/' + req.params.json));
});

app.get('^/css/:css(*.css)', (req, res) => {
   res.sendFile(path.join(__dirname + '/css/' + req.params.css));
});

//function doWork2(callback){
//    var result = "";
//    axios.get(weatherUrl)
//        .then(response => {
//           var weatherData = response.data;
//           console.log(weatherData.data[0].temp);
//           callback(weatherData.data[0].temp.toString());
//     })
//     .catch(error => {
//       callback(error);
//     });
//}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function getWeatherData(postalCode, country, callback){
    //const apiKey = "apiKey";
     const apiKey = "apiKey";
     const weatherForecastUrl = "https://api.weatherbit.io/v2.0/forecast/daily?key=" + apiKey +
                             "&lang=en&units=M&postal_code=" + postalCode +
                             "&country=" + country +
                             "&days=7";

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
               // console.log(parsedData);
             } catch (e) {
               console.error(e.message);
             }
           });
     });
}
