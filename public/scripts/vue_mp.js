var socket = null;

var vue_mp = new Vue({
    el: '#vue_mp',
    data: {
        bountyName: "",
        roomCode: "",
        players: ""
    },
    methods: {
        // GetBounties: function() {
            
        // }
    },
    computed: {
        
    },
    watch: {
    },
    created: function() {
        socket = io();
    },
    mounted: function() {
        var id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1); // "/bounty1";
        this.roomCode = id;

        socket.emit("roomCheck", id);
        socket.emit("updatePlayerList", id);

        socket.on('roomCheckResult', function(data) {
            if (data.success) {
                
            }
        });

        socket.on('updatePlayerList', function(players) {
            vue_game.players = players;
        });
    }
});
