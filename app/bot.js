var Bot = function() {
  var activityList = require('./botActivityList')();

  function generateMessage(commands) {
    return new Promise(function(resolve) {
      resolve(activityList.generate(commands));
    });
  }

  return {
    generateMessage : generateMessage
  };
};

module.exports = Bot;
