var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');

Settings.config(
  { url: 'https://dl.dropboxusercontent.com/s/dk2ltluk09u724c/pebble.html' },
  function(e) {
    console.log('opening configurable');

    // Reset color to red before opening the webview
    Settings.option('username', 'username');
    Settings.option('password', 'password');
  },
  function(e) {
    console.log('closed configurable');
    
    if (e.failed) {
      console.log(e.response);
    }
  }
);


// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Construct URL
var cityName = 'Philadelphia';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched weather data!");

    // Extract data
    var location = data.name;
    var temperature = Math.round(data.main.temp - 273.15) + " %C2%B0C";

    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);

    // Show to user
    card.subtitle(location + ", " + temperature);
    card.body(description);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);
