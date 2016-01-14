/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var raspi = require('raspi'),
  GPIO = require('raspi-gpio');

module.exports = {

  attributes: {

  },
  spinLeft: function(degree){
    var pwm = Math.round(90(degree * 1024));
    sails.config.enginePins.engineSpinLeft.write(GPIO.HIGH);
    sails.config.enginePins.engineSpinRight.write(GPIO.LOW);
    sails.config.enginePWM.engineSpinPWM.write(pwm);
  }
  spinRight: function(degree){
    var pwm = Math.round(90(degree * 1024));
    sails.config.enginePins.engineSpinRight.write(GPIO.HIGH);
    sails.config.enginePins.engineSpinLeft.write(GPIO.LOW);
    sails.config.enginePWM.engineSpinPWM.write(pwm);
  },
  power: function(pow){
    var pwm = Math.round(100(pow * 1024));
    if(pow > 0){
      sails.config.enginePins.enginePowerForward.write(GPIO.HIGH);
      sails.config.enginePins.enginePowerBack.write(GPIO.LOW);
      sails.config.enginePWM.enginePowerPWM.write(pwm);
    }else{
      sails.config.enginePins.enginePowerBack.write(GPIO.HIGH);
      sails.config.enginePins.enginePowerForward.write(GPIO.LOW);
      sails.config.enginePWM.enginePowerPWM.write(pwm);
    }
  },
  distance: function(){
    // TODO: calculate distance
  },
};
