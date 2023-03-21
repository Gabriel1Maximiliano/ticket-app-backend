const Ticket = require('./ticket');


class TicketList {

 constructor(){

    this.lastNumber = 0;
    this.pendings   = [];
    this.assigned   = [];

 }

 get nextNumber() {

    this.lastNumber++;
    return this.lastNumber;

}

// 3 que se ven en las cards 

get last13() {

    return this.assigned.slice(0,13)
}

createTicket() {

    const newTickek = new Ticket( this.nextNumber );
    this.pendings.push( newTickek );

    return newTickek;
}

assingTicket( agente , escritorio ){

    if( this.pendings.length === 0 ){
        return null;
    }

    const nextTicket = this.pendings.shift();

    nextTicket.agente = agente;
    nextTicket.escritorio = escritorio;

    this.assigned.unshift( nextTicket );

    return nextTicket;

}

}

module.exports = TicketList;