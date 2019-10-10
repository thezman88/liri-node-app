const inquirer = require('inquirer');
const axios = require('axios')

inquirer
  .prompt([
    {
      type: 'list',
      message: 'Select a command',
      choices: ['Concert-this', 'Spotify-This-Song', 'Movie-This', 'Do-What-It-Says'],
      name: 'commands',
    }
  ]).then(function(inquirerResponse) {


    console.log(inquirerResponse.commands);

    switch (inquirerResponse.commands) {

      case "Concert-this":
        concertThis()
        break;

      case "Spotify-This-Song":
        spotifyThis()
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
          console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
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

    var spotify = new Spotify({
      id: '99a2f862a4de42139c1a77fb17a6e94e',
      secret: '262c286117cf4beaa1c34c337a845161'
    });

    spotify.search({ type: 'track', query: `${inquirerResponse.song}` }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    if(data.tracks.items[0].preview_url===null){
      console.log("no preview available");
    }else{
      console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
    }
    console.log("Album: "+ data.tracks.items[0].album.name);

        });
    })
}
// function spotifyThis() {
//   console.log("user chose spotify-this-song");
//
//   var Spotify = require('node-spotify-api');
//
// var spotify = new Spotify({
//   id: '99a2f862a4de42139c1a77fb17a6e94e',
//   secret: '262c286117cf4beaa1c34c337a845161'
// });
//
// spotify.search({ type: 'track', query: 'truth hurts' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
//
// console.log("Artist: " + data.tracks.items[0].artists[0].name);
// console.log("Song Name: " + data.tracks.items[0].name);
// console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
// console.log("Album: "+ data.tracks.items[0].album.name);
//
// });
//
// }

function movieThis() {
  console.log("user chose Movie-This");

}

function whatItSays() {
  console.log("user chose Do-what-it-says");

}
