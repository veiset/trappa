var http = require('https');
var Firebase = require('firebase');
var firebase = new Firebase("https://bekk-trappa.firebaseio.com/");


function ruterData() {
    console.log('Fetching data... ');
    fetchRuterData(data => {
        const now = new Date();
        const departures = data
            .filter(p => p.MonitoredVehicleJourney.DirectionName === '2')
            .map(p => {
                p.departure = new Date(p.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime);
                return p;
            })
            .filter(p => p.departure > now);
        
        console.log(departures[0].departure);
        firebase.child('buss').set(Math.round((departures[0].departure - now)/1000/60));
    });
}

function fetchRuterData(callback) {
    var url = 'reisapi.ruter.no';
    var path = '/stopvisit/getdepartures/3010057?json=true';
    http.get({host: url, path: path}, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                callback(JSON.parse(body));
            } catch(ex) {
                callback([]);
            }
        });
    });
}

setInterval(ruterData, 30000);
ruterData();