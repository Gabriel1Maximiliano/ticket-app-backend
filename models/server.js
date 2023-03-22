const express  = require('express');
const path     = require('path');
const http     =  require('http');
const socketio =  require("socket.io")
const  Sockets = require('./sockets');
const cors     = require('cors');
require('dotenv').config();

class Server {
  
    constructor() {
        this.app =  express();
        this.port = process.env.PORT || 3000;

        // Http server
      

        // configuracion de sockets
        this.server = http.createServer( this.app );  
        //configuración del  socket
        this.io = socketio( this.server ,{ pingTimeout: 60000/* configuraciones */ });

        //inicializar sockets

        this.sockets = new Sockets( this.io );

    }

middlewares() {
        
//desplegar directorio público

this.app.use( express.static( path.resolve( __dirname + '../../public') ));
//
var whitelist = ['https://ticket-app-backend.vercel.app/', 'https://ticket-app-fron.vercel.app/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
this.app.use( cors( corsOptions ) );

this.app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

this.app.use('/last', (req, res) => {

    res.json({
        ok:true,
        last:this.sockets.ticketList.last13,
    })
})
    }
// socketConfig() {
//     new Sockets( this.io );
// }

    execut() {
// inicializar middlewares
        this.middlewares();

// inicializar sockets 
//this.socketConfig();        

// inicializar server
      this.server.listen(this.port, () => {
          console.log('Server corriendo en el puerto: '+this.port)
      });
    }
}

module.exports = Server;