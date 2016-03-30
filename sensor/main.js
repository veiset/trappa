import five from 'johnny-five';
import Firebase from 'firebase';

const firebase = new Firebase("https://bekk-trappa.firebaseio.com/");
const board = new five.Board();

const SAMPLE_SIZE = 10;
const SAMPLE_FREQ = 4;
const SAMPLE_TIMES = 2;

board.on("ready", function() {
    let data = [];
    let range = [];

    const light = new five.Sensor({ pin: 'A5', freq: 1000 });
    const mic = new five.Sensor({ pin: 'A4', freq: SAMPLE_FREQ });
    const sonar = new five.Sensor({ pin: 'A3', freq: 300 });

    sonar.on('data', (value) => firebase.child('sensors/distance').set(value));

    light.on('data', (value) => firebase.child('sensors/light').set(value));

    mic.on("data", function() {
        if (data.length === SAMPLE_SIZE) {
            const min = data.reduce((min, current) => min > current ? current : min, 100000);
            const max = data.reduce((max, current) => max < current ? current : max, 0);
            const voltage = (max-min)*5.0/1024.0;
            range.push(voltage);
            data = [];
        }
        if (range.length === SAMPLE_TIMES) {
            const total = range.reduce((total, current) => total+current, 0);
            const sound = Math.floor(total/range.length*1000);
            firebase.child('sensors/microphone').set(sound);
            range = [];
        }
        data.push(this.value);
    });
});
