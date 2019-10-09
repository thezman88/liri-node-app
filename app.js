const inquirer = require('inquirer');
const axios = require('axios')

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
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
        console.log("user chose spotify-this-song");
        break;

      case "Movie-This":
        console.log("user chose Movie-This");
        break;

      case "Do-What-It-Says":
        console.log("user chose Do-what-it-says");
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

      // We then run the request with axios module on a URL with a JSON
      axios.get(`https://rest.bandsintown.com/artists/${inquirerResponse.artist}/events?app_id=codingbootcamp`)
        .then((response) => {
          // Then we print out the imdbRating
          console.log("Venue: "+ response.data[0].venue.name);
          console.log("Location: "+ response.data[0].venue.city + ", "+ response.data[0].venue.region);
          console.log("Date: "+ response.data[0].datetime);

        });
    })
}
