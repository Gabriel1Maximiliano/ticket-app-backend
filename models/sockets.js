const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();
        this.ticketList = new TicketList();
    }
    socketEvents() {
        // On Connection
        this.io.on('connection', (socket) => {

            console.log('cliente conectado')

          

          socket.on('request-ticket', ( data,callback ) => {
            console.log(data)
           const newTicket = this.ticketList.createTicket();
           callback( newTicket );
           
          });
          socket.on('next-ticket-to-work', ( user,callback ) => {

            const { agente, escritorio } = user;

            const yourTicket = this.ticketList.assingTicket( agente, escritorio );
          
           callback( yourTicket );

           this.io.emit( 'ticket-assigned' , this.ticketList.last13 ); 
           
          })


        });



    }
}

module.exports = Sockets;