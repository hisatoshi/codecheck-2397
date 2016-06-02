var Bot = function(initaialValue) {
  var activityList = require('./botActivityList')();

  var states = {

  };
  var props = {

  };

  function generateMessage(commands, states, props) {
    var result = activityList.generate();
    states = result.newStates;
    return result.botMessage;
  }

  return {
    generateMessage;
  };
};

module.exports = Bot;
