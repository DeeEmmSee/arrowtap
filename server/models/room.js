class Room {
    constructor() {
        //this.ID = "";
        this.Code = "";
        this.Players = {};
    }

    PlayerCount(){
        return Object.keys(this.Players).length;
    }
}

module.exports = Room;