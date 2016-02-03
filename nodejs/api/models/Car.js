/**
* Car.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var raspi = require('raspi'),
  GPIO = require('raspi-gpio'),
  PWM = require('raspi-pwm'),
  UNSONIC = require('r-pi-usonic'),
  DISTANCE = false,
  DISTANCE_INTERVAL,
  GPIO_PINS = {},
  PWM_PINS = {},
  SENSOR_PINS = {};

module.exports = {


  setPins: function(){
    for (var i in sails.config.enginePins) {
      GPIO_PINS[i] = new GPIO.DigitalOutput({pin: sails.config.enginePins[i]});
    }
    for (var i in sails.config.enginePWM) {
      PWM_PINS[i] = new PWM({pin: sails.config.enginePWM[i]});
    }
    DISTANCE = USONIC.sensor(sails.config.sensorPins.trig, sails.config.sensorPins.echo, 1000);
    sails.log(GPIO_PINS);
    sails.log(PWM_PINS);
  },
  spinLeft: function(degree){
    var pwm = Math.round(90/(degree * 1024));
    GPIO_PINS.engineSpinRight.write(GPIO.LOW);
    GPIO_PINS.engineSpinLeft.write(GPIO.HIGH);
    PWM_PINS.engineSpinPWM.write(pwm);
  },
  spinRight: function(degree){
    var pwm = Math.round(90/(degree * 1024));
    GPIO_PINS.engineSpinLeft.write(GPIO.LOW);
    GPIO_PINS.engineSpinRight.write(GPIO.HIGH);
    PWM_PINS.engineSpinPWM.write(pwm);
  },
  forward: function(){
    GPIO_PINS.enginePowerBack.write(GPIO.LOW);
    GPIO_PINS.enginePowerForward.write(GPIO.HIGH);
  },
  backward: function(){
    GPIO_PINS.enginePowerForward.write(GPIO.LOW);
    GPIO_PINS.enginePowerBack.write(GPIO.HIGH);
  },
  stop: function(){
    GPIO_PINS.enginePowerForward.write(GPIO.LOW);
    GPIO_PINS.enginePowerBack.write(GPIO.LOW);
  },
  distanceOff: function(){
    clearInterval(DISTANCE_INTERVAL);
  },
  distanceOn: function(){
    var distance;
    DISTANCE_INTERVAL = setInterval(function(){
      distance = DISTANCE().toFixed(2);
      if(distance == sails.config.distance.distance)
        sails.io.emit("colisionDetect", {distance: distance});
    }, sails.config.distance.timeout)
  }
};
