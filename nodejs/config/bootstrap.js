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
 var RASPI = require('raspi');

module.exports.bootstrap = function(cb) {

  RASPI.init(function(){

    // On connect event
    sails.io.on('connect', function(client){
      sails.log('User connected');

      // When start, set pins
      client.on('setPins', function(data){
        sails.log('Seting Pins ...');
        sails.controllers.car.setPins();
      });

      // When user navigate on circle in controll app
      client.on('move', function(data){
        sails.log(data);
        sails.controllers.car.move(client, data);
      })
    })
  })

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
