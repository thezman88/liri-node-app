function spotifyThis() {
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: 'input',
        message: 'Enter a song name to find out some information',
        name: 'song',
      }
    ]).then(function(song) {
      var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
      id: '99a2f862a4de42139c1a77fb17a6e94e',
      secret: '262c286117cf4beaa1c34c337a845161'
    });

    spotify.search({ type: 'track', query: `${song}` }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
    console.log("Album: "+ data.tracks.items[0].album.name);

        });
    })
}
