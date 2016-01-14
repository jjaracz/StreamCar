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
    PWM = require('raspi-pwm').PWM;

module.exports.bootstrap = function(cb) {

  RASPI.init(function(){
    sails.io.on('connect', function(client){
      sails.log('User connected');
      client.on('setPins', function(data){
        sails.log('Seting Pins ...');
        for (var i = 0; i < sails.config.enginePins.length; i++) {
          sails.config.enginePins[i] = new GPIO.digitalOutput({pin: sails.config.enginePins[i]});
        }
        for (var i = 0; i < sails.config.enginePWM.length; i++) {
          sails.config.enginePWM[i] = new PWM({pin: sails.config.enginePWM[i]});
        }
      });
      client.on('move', function(data){
        sails.log(data);
        sails.controllers.car.index(client, data);
      })
    })
  })

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
