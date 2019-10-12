const dotenv = require("dotenv").config();
var keys = require("./keys.js");

const inquirer = require('inquirer');
const axios = require('axios');
var fs = require("fs");


inquirer
  .prompt([{
    type: 'list',
    message: 'Select a command',
    choices: ['Concert-this', 'Spotify-This-Song', 'Movie-This', 'Do-What-It-Says'],
    name: 'commands',
  }]).then(function(inquirerResponse) {


    console.log(inquirerResponse.commands);

    switch (inquirerResponse.commands) {

      case "Concert-this":
        concertThis()
        break;

      case "Spotify-This-Song":
        commandRunner("spotify-this-song", null);
        break;

      case "Movie-This":
        movieThis()
        break;

      case "Do-What-It-Says":
        whatItSays()
        break;
    }

  });

function concertThis() {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: 'input',
        message: 'What Artist would you like to see?',
        name: 'artist',
      }
    ]).then(function(inquirerResponse) {
      const axios = require('axios');
      const moment = require('moment')

      // We then run the request with axios module on a URL with a JSON
      axios.get(`https://rest.bandsintown.com/artists/${inquirerResponse.artist}/events?app_id=codingbootcamp`)
        .then((response) => {
          // Then we print out the concert data
          console.log("Venue: " + response.data[0].venue.name);
          console.log("Location: " + response.data[0].venue.city + "," + response.data[0].venue.region);
          var date = response.data[0].datetime;
          date = moment(date).format("MM/DD/YYYY");
          console.log("Date: " + date)

        });
    })
}

function spotifyThis() {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: 'input',
        message: 'Enter a song name to find out some information',
        name: 'song',
      }
    ]).then(function(inquirerResponse) {
      var Spotify = require('node-spotify-api');

      var spotify = new Spotify(keys.spotify);

      spotify.search({
        type: 'track',
        query: `${inquirerResponse.song}`
      }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        if (data.tracks.items[0].preview_url === null) {
          console.log("no preview available");
        } else {
          console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
        }
        console.log("Album: " + data.tracks.items[0].album.name);

      });
    })
}


function movieThis() {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: 'input',
        message: 'Enter the name of the movie youd like to find out more about?',
        name: 'movie',
      }
    ]).then(function(movieResponse) {
      const axios = require('axios');
      const moment = require('moment')

      // We then run the request with axios module on a URL with a JSON
      axios.get(`http://www.omdbapi.com/?t=${movieResponse.movie}&apikey=trilogy`)
        .then((response) => {
          console.log("Title: " + response.data.Title);
          console.log("Released: " + response.data.Released);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Countrys Filmed In:" + response.data.Country);
          console.log("Languages: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        });
    })



}

function whatItSays() {
  console.log("user chose Do-what-it-says");

  // This block of code will read from the "movies.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var command = dataArr[0];
    var argument = dataArr[1];

    // We will then re-display the content as an array for later use.
    console.log(dataArr);





  });
}
function commandRunner(commandName, argumentToPass){
  switch (commandName) {
    case "spotify-this-song":
       // run spotifythis with argument
       spotifyThis();
  }
}
