// This is the main loop
// This is where intensity level are watched
// When specific levels are detected event are emited and catched in specific listeners

// project config
var config = require('./config');
var flags = require('./flags');

// tessel
var tessel = require('tessel');
var gpio = tessel.port['GPIO']; // select the GPIO port

// events
var GoalListener = require('./GoalListener');
var goalListener = new GoalListener();

// Piezo setup
var piezoPin_A = gpio.analog[config.piezoPin_A];
var piezoPin_B = gpio.analog[config.piezoPin_B];
var piezoLastValue_A = piezoPin_A.read() * piezoPin_A.resolution;
var piezoLastValue_B = piezoPin_B.read() * piezoPin_B.resolution;

// Infrared setup
var irPin_A = gpio.analog[config.irPin_A];
var irPin_B = gpio.analog[config.irPin_B];

setInterval(function() {

    // Piezo management
    var piezoNewValue_A = piezoPin_A.read() * piezoPin_A.resolution;
    var piezoNewValue_B = piezoPin_B.read() * piezoPin_B.resolution;

    var piezoDiffLevel_A = Math.abs(piezoNewValue_A - piezoLastValue_A);
    var piezoDiffLevel_B = Math.abs(piezoNewValue_B - piezoLastValue_B);

    if(piezoDiffLevel_A > config.piezoMinLevelDiff && !flags.piezoDetected_A) {
        flags.piezoDetected_A = true;
        goalListener.soundForTeam('A');
    }
    if(piezoDiffLevel_B > config.piezoMinLevelDiff && !flags.piezoDetected_B) {
        flags.piezoDetected_B = true;
        goalListener.soundForTeam('B');
    }
    piezoLastValue_A = piezoNewValue_A;
    piezoLastValue_B = piezoNewValue_B;

    // Infrared management
    var irNewValue_A = irPin_A.read() * irPin_A.resolution;
    var irNewValue_B = irPin_B.read() * irPin_B.resolution;

    if(irNewValue_A < config.irMinLevel){
        flags.irDetected_A = true;
        goalListener.lightForTeam('A');
    }
    if(irNewValue_B < config.irMinLevel){
        flags.irDetected_B = true;
        goalListener.lightForTeam('B');
    }

}, 10);