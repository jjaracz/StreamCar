/**
 * CarController
 *
 * @description :: Server-side logic for managing cars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	setPins: function(){
		Car.setPins();
	},
	move: function(client, data){
		if(data.direction == 'left')
			Car.spinLeft(data.degree);
		else if(data.direction == 'right')
			Car.spinRight(data.degree);
		Car.power(data.power);
	}
};
