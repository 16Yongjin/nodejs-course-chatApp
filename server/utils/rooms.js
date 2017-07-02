class Rooms {
    constructor () {
        this.rooms = [];
    }

    addRoom (room) {

        if (this.rooms.length || !(room in this.rooms))
        {
            this.rooms.push(room);
        }
        
    }

    removeRoom (room) {
        this.rooms = this.rooms.filter((a) => a !== room);
    }

    getRoomList () {
        return this.rooms;
    }
}

module.exports = {Rooms};