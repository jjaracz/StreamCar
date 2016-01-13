/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	showHomePage:function(req, res){
		if(!req.session.user) return res.view('login')

		User.findOne(req.session.user, function(err, user){
			if(err) return res.negotiate(err);
			if(!user){
				sails.log.verbose("Session refers don't exist");
				return res.view('login');
			}

			return res.view('dashboard', {
				me: {
					name: user.name,
					email: user.id,
					lastLogged: user.lastLoggedIn
				}
			});
		});


	}
};
