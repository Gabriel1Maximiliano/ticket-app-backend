const Server = require('./models/server');

require('dotenv').config()

const server = new Server();

server.execut();

// const express = require('express');

// const app = express();

// const server =  require('http').createServer(app);

// const io = require('socket.io')(server);

// app.use( express.static( __dirname + '/public' ) );


// io.on('connection', ( socket )=>{
//  socket.emit( 'current-bands', ['hola'] )
// })


// server.listen(3000, () => console.log('esucho'))








