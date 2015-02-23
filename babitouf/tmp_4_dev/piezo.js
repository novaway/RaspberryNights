// THIS IS AN OBSOLETE CLASS USED TO TEST PIEZO GPIO

// Import the interface to Tessel hardware
var tessel = require('tessel');
var gpio = tessel.port['GPIO']; // select the GPIO port

var minLevel = 100;
var minTimeSpan = 3000;

//AUDIO CONFIG
var fs = require('fs');
var audioVs1053b = require('audio-vs1053b');
var moduleA = tessel.port['A'];
var audio = audioVs1053b.use(moduleA);
var audioFile = 'goal.mp3';


// Wait for the module to connect
audio.on('ready', function() {
    console.log("Audio module connected! ");

    console.log('Retrieving file...');
    var song = fs.readFileSync(audioFile);

    var pin = gpio.analog[5];
    var lastValue = pin.read() * pin.resolution;

    var lastTimeDetect = Date.now();

    setInterval(function() {
        var newValue = pin.read() * pin.resolution;
        var diffAmp = Math.abs(newValue - lastValue);
        if(diffAmp > minLevel) {
            var timeDetect = Date.now();
            var diffTime = timeDetect - lastTimeDetect;
            if(diffTime > minTimeSpan) {
                lastTimeDetect = timeDetect;
                //console.log('diffAmp on pin4=', diffAmp);
                console.log('Playin file');
                audio.play(song, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Done playing', audioFile);
                    }
                });
            }
        }
        lastValue = newValue;
    }, 10);



    //// Set the volume in decibels. Around .8 is good; 80% max volume or -25db
    //audio.setVolume(.8, function(err) {
    //    if (err) {
    //        return console.log(err);
    //    }
    //    // Get the song
    //
    //    // Play the song
    //    console.log('Playing ' + audioFile + '...');
    //    audio.play(song, function(err) {
    //        if (err) {
    //            console.log(err);
    //        } else {
    //            console.log('Done playing', audioFile);
    //        }
    //    });
    //});
});


