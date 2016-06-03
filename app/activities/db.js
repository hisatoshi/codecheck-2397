var DB = function() {
  var mongoose = require('mongoose');
  //var url = 'mongodb://heroku_vl74bkz0:vcf7uagjf1sadkt0nvfvq6ita5@ds023213.mlab.com:23213/heroku_vl74bkz0';
  var url = 'mongodb://localhost/herokutest';
  var Schema = mongoose.Schema;

  var todoSchema = new Schema({
    title : String,
    text : String
  });
  var wordSchema = new Schema({
    word : String,
    count : Number
  });
  var Todo = mongoose.model('todo', todoSchema);
  var Word = mongoose.model('word', wordSchema);

  mongoose.connect(url);
  var todo = {};
  var word = {};

  /***********************************************
  todoList関係の処理
  ***********************************************/
  todo.addToDo = function(datas) {
    return new Promise(function(resolve, reject) {
      var _todo = new Todo();
      _todo.title = datas[0];
      _todo.text  = datas[1];
      _todo.save(function(err) {
        if(err) reject(err);
        resolve('added todo');
      });
    });
  };

  todo.deleteToDo = function(datas) {
    return new Promise(function(resolve, reject) {
      var query = {};
      query.title = datas[0];
      Todo.remove(query, function(err) {
        if(err) reject(err);
        resolve('deleted todo');
      });
    });
  };

  todo.listToDo = function() {
    return new Promise(function(resolve, reject) {
      Todo.find({},function(err, _d) {
        if(err) reject(err);
        if(_d.length === 0) {
          resolve('todo empty');
        }else{
          resolve(
            _d.reduce(function(a, b) {
              return a+b.title+' '+b.text+'\n';
            },'')
          );
        }
      });
    });
  };

  /**************************************************
  wordList関係の処理
  **************************************************/

  word.findWord = function(data) {
    return new Promise(function(resolve, reject) {
      var query = {word : data[0]};
      Word.find(query,function(err, _d) {
        if(err) reject(err);
        if(_d.length === 0) {
          _addWord(data[0]).then(function(d){
            resolve(d);
          });
        }else{
          _incrementWord(data[0]).then(function() {
            resolve('あなたの前に'+String(_d[0].count)+'人が'+String(_d[0].word)+'という言葉を投稿しました');
          });
        }
      });
    });
  };

  var _addWord = function(data) {
    return new Promise(function(resolve, reject) {
      var _word = new Word();
      _word.word = data;
      _word.count  = 1;
      _word.save(function(err) {
        if(err) reject(err);
        resolve(data+'という言葉はあなたが初めて使いました');
      });
    });
  };

  var _incrementWord = function(data) {
    return new Promise(function(resolve, reject) {
      var condition = {};
      condition.word = data;
      var operation = {$inc : {count:1}};
      Word.update(condition, operation, function(err) {
        if(err) reject(err);
        resolve('あなたの前に');
      });
    });
  };
  return {
    todo : todo,
    word : word
  };
};


module.exports = DB();
