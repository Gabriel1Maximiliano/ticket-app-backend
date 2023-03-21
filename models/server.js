const express  = require('express');
const path     = require('path');
const http     =  require('http');
const socketio =  require("socket.io")
const  Sockets = require('./sockets');
const cors     = require('cors');

class Server {
  
    constructor() {
        this.app =  express();
        this.port = process.env.PORT || 3000;

        // Http server
      

        // configuracion de sockets
        this.server = http.createServer( this.app );  
        //configuración del  socket
        this.io = socketio( this.server ,{ pingTimeout: 60000/* configuraciones */ });

    }

middlewares() {
        
//desplegar directorio público

this.app.use( express.static( path.resolve( __dirname + '../../public') ));
//
this.app.use( cors() );
    }
socketConfig() {
    new Sockets( this.io );
}

    execut() {
// inicializar middlewares
        this.middlewares();

// inicializar sockets 
this.socketConfig();        

// inicializar server
      this.server.listen(this.port, () => {
          console.log('Server corriendo en el puerto: '+this.port)
      });
    }
}

module.exports = Server;