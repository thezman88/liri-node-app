const dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
const keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
const inquirer = require('inquirer');


var spotify = new Spotify(keys.spotify);


const command = process.argv[2];
const secondCommand = process.argv.slice(3).join(' ');

switch (command) {
  case ('concert-this'):
    concertThis(secondCommand);
    break;

  case ('spotify-this'):
    spotifyThis(secondCommand);
    break;

  case ('movie-this'):
    movieThis(secondCommand);
    break;

  case ('do-what-it-says'):
    doWhatItSays()
    break;

  default:
    console.log('Try again');
};

function concertThis(band) {
  // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
  var axios = require("axios");
  var moment = require("moment")

  // Then run a request with axios to the OMDB API with the movie specified
  axios.get(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`).then(
    function(response) {
      console.log("************************");
      console.log("Artist: "+response.data[0].lineup);
      fs.appendFileSync("log.txt", "Artist: " + response.data[0].lineup + " ,");

      console.log("Venue: " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
      var date = response.data[0].datetime;
      date = moment(date).format("MM/DD/YYYY");
      console.log("Date: " + date)
      console.log("************************");



}).catch(function(err) {
  console.error(err);
  console.log('no concerts found');

})
}

function spotifyThis(song) {
  spotify.search({
    type: 'track',
    query: song,
    limit: 1
  }, function(error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("************************");
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("************************");
      }
    } else {
      console.log('Error occurred.');
    }
  });

}

function movieThis(movie) {
  // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
  var axios = require("axios");
  var moment = require("moment")

  // Then run a request with axios to the OMDB API with the movie specified
  axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`).then(
    function(response) {
      console.log("************************");

      console.log("Title: " + response.data.Title);
      console.log("Released: " + response.data.Released);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Countrys Filmed In:" + response.data.Country);
      console.log("Languages: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("************************");

    });

}

function doWhatItSays() {
  fs.readFile('random.txt', "utf8", function(error, data) {
    var txt = data.split(',');

    spotifyThis(txt[1]);
  });
}
