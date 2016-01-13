/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    // User Name like Jan Jaracz
    name: {
      type: 'string'
    },
    // User Email like test@test.pl
    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },
    // Status of login
    loggedIn: 'boolean',

    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    }

  },

  beforeCreate: function(values, next){
    bcrypt.hash(values.password, 8, function(err, hash){
      if(err) return next(err);
      values.password = hash;
      User.findOne(values.email, function(err, user){
        if(!user){
          sails.log.verbose(user);
          next();
        }
        if(user) next(new Error('User with this email exist'));
      })
    });
  }
};
