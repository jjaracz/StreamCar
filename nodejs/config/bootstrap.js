/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
 var RASPI = require('raspi'),
    GPIO = require('raspi-gpio').GPIO,
    PWM = require('raspi-pwm').PWM,
    GPIO_PINS = sails.config.enginePins,
    PWM_PINS = sails.config.enginePWM;

module.exports.bootstrap = function(cb) {

  RASPI.init(function(){

    // On connect event
    sails.io.on('connect', function(client){
      sails.log('User connected');

      // When start, set pins
      client.on('setPins', function(data){
        sails.log('Seting Pins ...');
        for (var i = 0; i < GPIO_PINS.length; i++) {
          GPIO_PINS[i] = new GPIO.digitalOutput({pin: GPIO_PINS[i]});
        }
        for (var i = 0; i < PWM_PINS.length; i++) {
          PWM_PINS[i] = new PWM({pin: PWM_PINS[i]});
        }
      });

      // When user navigate on circle in controll app
      client.on('move', function(data){
        sails.log(data);
        sails.controllers.car.index(client, data, GPIO_PINS, PWM_PINS);
      })
    })
  })

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
