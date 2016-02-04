/*

Global Variable for pins

*/
module.exports.outPins = {
  engineSpinLeft: 'GPIO17',
  engineSpinRight: 'GPIO23',
  enginePowerForward: 'GPIO27',
  enginePowerBack: 'GPIO22',
  echo: 'GPIO25',
  light: 'GPIO10'
};
module.exports.pwmPins = {
  engineSpinPWM: 'GPIO18'
};
module.exports.inPins = {
  trig: 'GPIO24'
};
module.exports.settings = {
  timeout: 33,
  distance: 20
};
