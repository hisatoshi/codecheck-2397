var Word = function() {

  var wordDB = require('./db.js').word;

  function findWord(data) {
    return new Promise(function(resolve, reject) {
      wordDB.findWord(data).then(function(ret){resolve(ret);},function(err){reject(err);});
    });
  }

  return {
    findWord : findWord
  };
};

module.exports = Word;
