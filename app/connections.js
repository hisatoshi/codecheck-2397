var Connections = function() {

  var array = [];

  function push(ws) {
    array.push(ws);
  }

  function remove(ws) {
    array = array.filter(function(connection) {return (connection === ws)? false : true;});
  }

  function broadCast(messages) {
    array.forEach(function(connection) {
      messages.forEach(function(ms) {
        connection.send(JSON.stringify({data : ms}));
      });
    });
  }
  function getLength() {return array.length;}
  return {
    push: push,
    remove : remove,
    broadCast : broadCast,
    getLength : getLength
  };
};


module.exports = Connections;
