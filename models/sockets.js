const BandList = require('./band-list');

class Sockets {

    constructor(io) {

        this.io = io;
        this.socketEvents();
        this.bandList = new BandList();
    }
    socketEvents() {
        // On Connection
        this.io.on('connection', (socket) => {

            console.log('cliente conectado')

            // emitir al cliente conectado todas las bandas
            socket.emit('current-bands', this.bandList.getBands());


            // vote for the band
            socket.on('band-vote', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            })

            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());

            })
            socket.on('change-band-name', ({id ,name}) => {
               
                this.bandList.changeName( id,name )
                this.io.emit('current-bands', this.bandList.getBands());

            })
            socket.on('create-new-band', ({name}) => {
               
                this.bandList.addBand( name )
                this.io.emit('current-bands', this.bandList.getBands());

            })


        })



    }
}

module.exports = Sockets;