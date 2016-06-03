var ToDoList = function() {

  var todoDB = require('./db.js').todo;

  function addToDo(data) {
    return new Promise(function(resolve, reject) {
      todoDB.addToDo(data).then(function(ret){resolve(ret);},function(err){reject(err);});
    });
  }

  function deleteToDo(data) {
    return new Promise(function(resolve, reject) {
      todoDB.deleteToDo(data).then(function(ret){resolve(ret);},function(err){reject(err);});
    });
  }

  function listToDo() {
    return new Promise(function(resolve, reject) {
      todoDB.listToDo().then(function(ret){resolve(ret);},function(err){reject(err);});
    });
  }



  return {
    addToDo : addToDo,
    deleteToDo : deleteToDo,
    listToDo : listToDo
  };
};

module.exports = ToDoList;
