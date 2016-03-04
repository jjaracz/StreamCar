/*

Global Variable for pins

*/
module.exports.outPins = {
  engineSpinLeft: 'GPIO17',
  engineSpinRight: 'GPIO27',
  enginePowerForward: 'GPIO22',
  enginePowerBack: 'GPIO23',
  echo: 'GPIO25',
  light: 'GPIO8'
};
module.exports.pwmPins = {
  engineSpinPWM: 'GPIO12',
  enginePowerPWM: 'GPIO19'
};
module.exports.inPins = {
  trig: 'GPIO24'
};
module.exports.settings = {
  timeout: 33,
  distance: 20
};
