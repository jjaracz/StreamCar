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
		if(data.power == 0){
			Car.stop();
			return;
		}
		if(data.direction.x == 1)
			Car.spinLeft(data.degree);
		else if(data.direction.x == 2)
			Car.spinRight(data.degree);
		if(data.direction.y == 3)
			Car.forward();
		else if(data.direction.y == 4)
			Car.backward();
	},
	turnoff: function(data){
		if(data.sensor == 1)
			Car.distanceOff();
		else if(data.sensor == 2)
			Car.beaconsOff();
	},
	turnOn: function(data){
		if(data.sensor == 1)
			Car.distanceOn();
		else if(data.sensor == 2)
			Car.beaconsOn();
	}

};
