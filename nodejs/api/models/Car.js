/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var raspi = require('raspi'),
  GPIO = require('raspi-gpio'),
  PWM = require('raspi-pwm'),
  GPIO_PINS = {},
  PWM_PINS = {};

module.exports = {


  setPins: function(){
    for (var i in sails.config.enginePins) {
      GPIO_PINS[i] = new GPIO.DigitalOutput({pin: sails.config.enginePins[i]});
    }
    for (var i in sails.config.enginePWM) {
      PWM_PINS[i] = new PWM({pin: sails.config.enginePWM[i]});
    }
    sails.log(GPIO_PINS);
    sails.log(PWM_PINS);
  },
  spinLeft: function(degree){
    var pwm = Math.round(90/(degree * 1024));
    GPIO_PINS.engineSpinLeft.write(GPIO.HIGH);
    GPIO_PINS.engineSpinRight.write(GPIO.LOW);
    PWM_PINS.engineSpinPWM.write(pwm);
  },
  spinRight: function(degree){
    var pwm = Math.round(90/(degree * 1024));
    GPIO_PINS.engineSpinRight.write(GPIO.HIGH);
    GPIO_PINS.engineSpinLeft.write(GPIO.LOW);
    PWM_PINS.engineSpinPWM.write(pwm);
  },
  power: function(pow){
    var pwm = Math.round(100/(pow * 1024));
    if(pow > 0){
      GPIO_PINS.enginePowerForward.write(GPIO.HIGH);
      GPIO_PINS.enginePowerBack.write(GPIO.LOW);
      PWM_PINS.enginePowerPWM.write(pwm);
    }else{
      GPIO_PINS.enginePowerBack.write(GPIO.HIGH);
      GPIO_PINS.enginePowerForward.write(GPIO.LOW);
      PWM_PINS.enginePowerPWM.write(pwm);
    }
  },
  distance: function(){
    // TODO: calculate distance
  },
};
