/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt');

module.exports = {

	login: function(req, res){
		email = req.body.email;
		password = req.body.pass;
		sails.log(email + '  ' + password);
		User.findOne({
			email: email
		}, function(err, user) {
				if(user){
					bcrypt.compare(password, user.password, function(err, match) {
							if(match){
								req.session.user = user.id;
								sails.log(user.email)
								return res.ok();
							}else{
								sails.log(err);
								return res.negotiate(err);
							}
					});
				}else{
					sails.log(err);
					return res.negotiate(err);
				}
		})
	}

};
