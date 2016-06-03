var
  server = require('http').createServer(),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
var
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server });

var bot = require('./bot')();
var Connections = require('./connections.js')();

app.use(express.static('app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', function(ws) {
  Connections.push(ws);

  ws.on('message', function(message) {
    var _ = message.split(' ');

    if(_[0] === 'bot') {
      bot.generateMessage(_.slice(1,_.length)).then(function(d) {
        Connections.broadCast([message,d]);
      });
    }else{
      Connections.broadCast([message]);
    }
  });

  ws.on('close', function() {
    Connections.remove(ws);
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port); });
