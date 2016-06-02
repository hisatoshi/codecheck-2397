var Pong = function() {
  function pong () {
    return new Promise(function(resolve) {
      resolve('pong');
    });
  }
  return {
    pong : pong
  };
};

module.exports = Pong;
