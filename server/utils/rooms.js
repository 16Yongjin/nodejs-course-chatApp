class Rooms {
    constructor () {
        this.rooms = [];
    }

    addRoom (room) {

        if (this.rooms.length == 0 || (this.rooms.filter((a) => a === room) === []))
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