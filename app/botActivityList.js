var botActivityList = function() {

  var List = [
    {command : ['ping'], func : pong, args : []},
    {command : ['todo', 'add'], func : addToDo, args : [2, 3]},
    {command : ['todo', 'deletes'], func : deleteTODo, args : [2]},
    {command : ['todo', 'list'], func : listToDo, args[]},
  ];


  function generate(commands, states, props) {

    

    return  func(args, states, props)
  }

  function pong(states, props, args) {
    return {
      newState : state,
      botMessage : "pong"
    }
  }

  return {
    generate : generate
  };
};


export.modules = botActivityList;
