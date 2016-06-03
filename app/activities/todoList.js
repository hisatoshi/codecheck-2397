var ToDoList = function() {

  var fs = require('fs');
  var dbName = '../datas/todoData.json';

  function addToDo(data) {
    return new Promise(function(resolve, reject) {
      fs.readFile(dbName, 'utf-8', function(err, text) {
        if(err) reject(err);

        var _data = JSON.parse(text);
        _data[data[0]] = data[1];
        var __data = JSON.stringify(_data);

        fs.writeFile(dbName, __data, function(err) {
          if(err) reject(err);

          resolve('todo added');
        });
      });
    });
  }

  function deleteToDo(data) {
    return new Promise(function(resolve, reject) {
      fs.readFile(dbName, 'utf-8', function(err, text) {
        if(err) reject(err);

        var _data = JSON.parse(text);
        var keys = Object.keys(_data);

        for(var i=0; i < keys.length; i++) {
          if(keys[i] === data[0]) {
            delete _data[keys[i]];
            break;
          }
        }
        var __data = JSON.stringify(_data);
        fs.writeFile(dbName, __data, function(err) {
          if(err) reject(err);
          resolve('todo deleted');
        });
      });
    });
  }

  function listToDo() {
    return new Promise(function(resolve, reject) {
      fs.readFile(dbName, 'utf-8', function(err, text) {
        if(err) reject(err);
        var jsonData = JSON.parse(text);
        resolve(_listToDo(jsonData));
      });
    });
  }

  function _listToDo(jsonData) {
    var keys = Object.keys(jsonData);
    return keys.reduce(function(a,b) {
      return a+String(b)+ +String(jsonData[b])+'\n';
    } ,'');
  }

  return {
    addToDo : addToDo,
    deleteToDo : deleteToDo,
    listToDo : listToDo
  };
};

module.exports = ToDoList;
