var
  server = require('http').createServer(),
  express = require('express'),
  app = express(),
  port = 3000;
var 
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server });  

var Bot = require('./bot');


app.use(express.static('app')); 
 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', function(ws) {
  console.log(ws);
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });
