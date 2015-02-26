var EventEmitter = require('events').EventEmitter;
var util = require('util');
var winston = require('winston');

/**
 * Creates an instance of the GoalListener class.
 *
 * @constructor
 * @module {GoalListener} babitouf/GoalListener
 */
function GoalListener() {

    var self = this;

    this.on('goal_sound', function(team) {
        winston.info('Goal sound detected for team ', team);
    });
    this.on('goal_light', function(team) {
        winston.info('Goal light detected for team ', team);
    });

    winston.info('Goal listener ready');

};

util.inherits(GoalListener, EventEmitter);

GoalListener.prototype.lightForTeam = function(team) {
    this.emit('goal_light', team);
};
GoalListener.prototype.soundForTeam = function(team) {
    this.emit('goal_sound', team);
};

module.exports = GoalListener;
