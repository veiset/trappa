var Twitter = require('twit');
var twitter = new Twitter({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
});

var Firebase = require('firebase');
var firebase = new Firebase("https://bekk-trappa.firebaseio.com/");

var stream = twitter.stream('statuses/filter', { track: 'fuck'});

console.log('HeiHei');

stream.on('tweet', function(tweet) {
    console.log(tweet);
    firebase.child('twitter').once('value', function(snapshot) {
      firebase.child('twitter').set(snapshot.val() + 1);
    });
});
