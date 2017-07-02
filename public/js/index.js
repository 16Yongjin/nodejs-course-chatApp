var socket = io();
var dropdown = jQuery('.dropdown-content');



socket.on('connect', function () {
    socket.emit('getCurrentRooms', 'give me rooms', function(rooms) {
        setRoomList(rooms);
    });
});



socket.on('currentRooms', function (rooms) {
    setRoomList(rooms);
});

$( document ).ready(function() {
    setRoomList(rooms);
    
});

function setRoomList(rooms) {
    dropdown.html('');

    if (rooms.length != 0) {
        rooms.forEach(function(room) {
            var link = jQuery('<a></a>').attr('href', '#')
            link.click(function () {
                jQuery("#room").val(room);
            })
            link.text(room);
            dropdown.append(link);
        });
    }
    else {
        var link = jQuery('<a></a>').attr('href', '#')
        link.text('No existing room');
        dropdown.append(link);
    }
    
    dropdown.css({
        'width': jQuery('.form-field').width() + 'px'
    });
     
}

function showRooms() {
    
}



