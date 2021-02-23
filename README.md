# WeatherApp
<a href="https://www.openode.io/">Cloud hosted on opeNode.io</a>

Deployed version can be seen at
https://ourweatherboard.eu.openode.io/

Weather app is a simple weather dashboard for multiple cities. 

How to setup and run locally? 
1. Clone this repository using terminal 
```
git clone https://github.com/praseodeveloper/WeatherApp.git
```
2. Install node.js from https://nodejs.org/en/download/
3. Go to WeatherApp folder in terminal and run  
```
npm install  
npm start  
```
4. Launch https://localhost:3000 

How can I customize the weather tiles? 
Each tile in the application corresponds to a html file in the html folder. 
These html files are referred inside iFrames in index.html

To create a new weather tile, 
1. Copy an existing weather html file and paste it inside the html folder
2. Specify postalCode and country in the html head script.
3. Add reference to this html file in index.html
4. Reload the deployed application in your browser. 
