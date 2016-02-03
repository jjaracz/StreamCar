/*

Global Variable for pins

*/
module.exports.enginePins = {
  // ENGINE PINS
  engineSpinLeft: 'GPIO17',
  engineSpinRight: 'GPIO23',
  enginePowerForward: 'GPIO27',
  enginePowerBack: 'GPIO22'
};
module.exports.enginePWM = {
  // ENGINE PWM PINS
  engineSpinPWM: 'GPIO18'
};
module.exports.sensorPins = {
  // DISTANCE SENSOR
  echo: 'GPIO25',
  trig: 'GPIO24'
};
module.exports.distance = {
  timeout: 33,
  distance: 20
};
