/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: function(req, res){
		email = req.body.email;
		password = req.body.pass;
    User.loginUser(email, password, function(err, data){
      if(data.data == 200){
        req.session.user = data.id;
        sails.sockets.blast('login', { email: email, name: data.name });
        return res.ok();
      }else if(data.data == 500){
        return res.negotiate(data.err);
      }else if(data.data == 404){
        return res.notFound(state.err);
      }
    });
	}

};
