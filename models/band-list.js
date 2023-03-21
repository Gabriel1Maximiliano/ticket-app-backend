const Band = require('./band');


class BandList {


    constructor(){
this.bands = [
    new Band('Metallica'),
    new Band('Bon Jovi'),
    new Band('Mambrú'),
    new Band('Héroes del Silencio'),
]

    }

    addBand( name ){
       const newBand = new Band( name );
       this.bands.push( newBand );
       return this.bands;
    }

    removeBand( id ){

        const data = this.bands.filter( band => band.id !== id );

        this.bands = data
 
          
    }
    getBands(){
        return this.bands;
    }
    increaseVotes( id ){
        this.bands = this.bands.map( band =>{
           if( band.id === id ){
              band.votes +=1;
           }
           return band;
        })
    }
    changeName( id, newName ){
        
        this.bands = this.bands.map( band =>{
           if( band.id === id ){
              band.name = newName;
           }
           return band;
        })
    }
}

module.exports = BandList;