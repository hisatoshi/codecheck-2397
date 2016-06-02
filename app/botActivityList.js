var BotActivityList = function() {

  //botの実際の返答を定義してあるファイル群
  var funcList = {};
  funcList.todoList = require('./activities/todoList.js')();
  funcList.pong = require('./activities/pong.js')();
  funcList.generateHash = require('./activities/generateHash.js')();

  /***************************************************************************
  command : 'bot'の後ろに付けられるコマンド
  func : 上記コマンドの実装
  args : 上記実装に受け渡す仮引数，Array.prototype.slice()で指定するための値
  (仮引数なしの場合は[]を指定)←配列の長さで場合分けするため
  ***************************************************************************/
  var List = [
    {command : ['ping'], func : funcList.pong.pong, args : []},

    {command : ['todo', 'add'], func : funcList.todoList.addToDo, args : [2, 4]},
    {command : ['todo', 'deletes'], func : funcList.todoList.deleteTODo, args : [2,3]},
    {command : ['todo', 'list'], func : funcList.todoList.listToDo, args : []}

    //{command : anything else, func : generateHash, args[2, 3]}
  ];

  //botに投げられたメッセージから，返答を作成する．
  function generate(commands) {
    return new Promise(function(resolve) {
      var listLength = List.length;
      var itr = -1;

      //適用される関数を選択
      for(var i=0; i<listLength; i++){
        var zippedCommands = _zip(commands, List[i].command);
        var flag = zippedCommands.map(_isSameString).reduce(_bothTrue,true);

        if(flag) {
          itr=i;
          break;
        }

      }

      //当てはまらない場合は'?'をbotから返す.
      if(~itr) {resolve('?');}

      //当てはまったときは，該当の関数に委譲
      if(List[i].args.length ===2)
        resolve(List[i].func(commands.slice(List[i].args[0], List[i].args[1])));
      else
        resolve(List[i].func());
    });
  }

  function _zip(array1, array2) {
    var aL = array1.length;
    var bL = array2.length;
    if(aL === 0 || bL === 0) {
      return [];
    }else{
      return [[array1[0], array2[0]]].concat(_zip(array1.slice(1,aL), array2.slice(1, bL)));
    }
  }

  function _isSameString(string1, string2) {
    return string1 === string2;
  }

  function _bothTrue(b1, b2)  {
    return b1 && b2;
  }

  return {
    generate : generate
  };
};


module.exports = BotActivityList;
