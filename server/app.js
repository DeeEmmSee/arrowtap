const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const io = require('socket.io').listen(server);
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

const Room = require('./models/room');
const Player = require('./models/player');

//Site
const htmlPath = path.join(__dirname, '../public/html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/scripts', express.static(path.join(__dirname, '../public/scripts')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: htmlPath });
});

app.get('/game/:game', (req, res) => {
	res.sendFile('game.html', { root: htmlPath });
});

// Last
/*app.listen(PORT, function(){
	console.log("Now running on port " + PORT);
});*/

var rooms = {};
var players = {};

// Sockets
io.on('connection', function (socket) {	
	console.log("Connected: " + socket.id);

	socket.Player = new Player();
	socket.Player.ID = socket.id;
	socket.Player.Name = GetNewID();

	players[socket.id] = socket.Player;

	socket.on('setPlayerName', function(name){
		socket.Player.Name = name;
	});

	socket.on('test', function(){
		console.log("Test123");
	});

	socket.on('updatePlayerList', function(roomCode) {
		io.to(rooms[roomCode].Code).emit('updatePlayerList', GetPlayerList(roomCode));
	});

	socket.on('roomCheck', function(roomCode){
		var exists = CheckRoom(roomCode);
		//var newId = GetNewID();

		if (!exists) {
			// make room
			var newRoom = new Room();
			newRoom.Code = roomCode;
			//newRoom.ID = newId;
			newRoom.Players[socket.Player.ID] = socket.Player;

			//console.log(newRoom);

			rooms[roomCode] = newRoom;
			socket.Room = newRoom;
			socket.join(roomCode);
		}
		else {
			rooms[roomCode].Players[socket.Player.ID] = socket.Player;
			socket.Room = rooms[roomCode];
			socket.join(rooms[roomCode].Code);
		}

		io.to(rooms[roomCode].Code).emit('updatePlayerList', GetPlayerList(roomCode));

		ToConsole();

		socket.emit("roomCheckResult", { success: true });
	});

	socket.on('disconnect', function(){
		// Remove from room
		
		delete players[socket.id];

		if (socket.Room) {	
			delete rooms[socket.Room.Code].Players[socket.id];

			io.to(rooms[socket.Room.Code].Code).emit('updatePlayerList', GetPlayerList(socket.Room.Code));

			if (rooms[socket.Room.Code].PlayerCount() == 0) {
				console.log("Room empty: " + rooms[socket.Room.Code].Code);
				delete rooms[socket.Room.Code];
			}
		}

		//ToConsole();

		console.log("Disconnected: " + socket.id);
	});
});

// Functions
function CheckRoom(roomCode){
	return roomCode in rooms;
}

function GetNewID(){
	return crypto.randomBytes(16).toString('base64');
}

function ToConsole(){
	console.log("players");
	console.log(players);
	console.log("rooms");
	console.log(rooms);
}

function GetPlayerList(roomCode){
	var players = [];

	for (var p in rooms[roomCode].Players) {
		if (rooms[roomCode].Players.hasOwnProperty(p) && rooms[roomCode].Players[p].Name.length > 0) {
			players.push(rooms[roomCode].Players[p]);
		}
	}

	return players;
}

// API
app.get('/api/currentgames', (req, res) => {
	var test = { "App1": "Test123" };
	res.status(200).send(test);
});

server.listen(PORT);
console.log("Listening on port 3000");

// TEST
/*var isMomHappy = false;

// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }

    }
);

// call our promise
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
         // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};

askMom();*/