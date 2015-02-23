// THIS IS AN OBSOLETE CLASS USED TO TEST PIEZO GPIO

// Import the interface to Tessel hardware
var tessel = require('tessel');
var gpio = tessel.port['GPIO']; // select the GPIO port

//var minLevel = 100;
//var minTimeSpan = 3000;


var pin_A = gpio.analog[5];
var pin_B = gpio.analog[4];

var lastValue_A = pin_A.read() * pin_A.resolution;
var lastValue_B = pin_B.read() * pin_B.resolution;

//var lastTimeDetect = Date.now();


setInterval(function () {
    var newValue_A = pin_A.read() * pin_A.resolution;
    var newValue_B = pin_B.read() * pin_B.resolution;

    if(newValue_A < 200){ // ~ 1023 ON ~ 0 OFF
        console.log('---- GOAL FOR TEAM A !! ');
    }

    if(newValue_B < 200){ // ~ 1023 ON ~ 0 OFF
        console.log('---- GOAL FOR TEAM B !! ');
    }

}, 10);



