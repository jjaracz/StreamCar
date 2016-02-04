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
  BLEACON = require('bleacon'),
  BEACON_STAT = false,
  DISTANCE = false,
  DISTANCE_INTERVAL,
  GPIO_PINS = {},
  PWM_PINS = {},
  SENSOR_PINS = {};

module.exports = {


  setPins: function(){
    for (var i in sails.config.outPins) {
      GPIO_PINS[i] = new GPIO.DigitalOutput({pin: sails.config.outPins[i]});
    }
    for (var i in sails.config.pwmPins) {
      PWM_PINS[i] = new PWM({pin: sails.config.pwmPins[i]});
    }
    DISTANCE = USONIC.sensor(sails.config.sensorPins.trig, sails.config.sensorPins.echo, 1000);
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
  lightOn: function(){
    GPIO_PINS.light.write(GPIO.HIGH);
  },
  lightOff: function(){
    GPIO_PINS.light.write(GPIO.LOW);
  },
  distanceOff: function(){
    clearInterval(DISTANCE_INTERVAL);
  },
  distanceOn: function(){
    var distance;
    DISTANCE_INTERVAL = setInterval(function(){
      distance = DISTANCE().toFixed(2);
      if(distance == sails.config.settings.distance)
        sails.io.emit("colisionDetect", {distance: distance});
    }, sails.config.settings.timeout)
  },
  beaconOn: function(){
    BEACON_STAT = true;
    BLEACON.startScanning();
    BLEACON.on('discover', function(bleacon) {
      sails.io.emit('scanBeacon', { beacon: bleacon });
    });
  },
  beaconOff: function(){
    BEACON_STAT = false;
    BLEACON.stopScanning();
  },
  getBeacon: function(data){
    if(!BEACON_STAT){
      if(typeof data.uuid !== 'undefined' && typeof data.major !== 'undefined' && typeof data.minor !== 'undefined')
        BLEACON.startScanning(data.uuid, data.major, data.minor);
      else if(typeof data.uuid !== 'undefined')
        BLEACON.startScanning(data.uuid);
      else
        return;
      BLEACON.on('discover', function(beacon){
        sails.io.emit('scanBeacon', {beacon: beacon});
        BLEACON.stopScanning();
      });
    }
  },
};
