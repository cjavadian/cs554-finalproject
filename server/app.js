const express = require("express");
const expressgraphql = require("express-graphql");
const schema =  require("./schema/schema.js")
const cors = require("cors");

const app = express();
app.use(cors());

const http = require('http')
const socketIO = require('socket.io')
const port = 4001;

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', socket => {
	console.log('User connected')

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
// var path = require('path');
// var server = require('http').createServer(app);
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 4000;

// Chatroom

var numUsers = 0;

// io.on('connection', (socket) => {
//   var addedUser = false;

//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', (data) => {
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });

//   // when the client emits 'add user', this listens and executes
//   socket.on('add user', (username) => {
//     if (addedUser) return;

//     // we store the username in the socket session for this client
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//       numUsers: numUsers
//     });
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.emit('user joined', {
//       username: socket.username,
//       numUsers: numUsers
//     });
//   });

//   // when the client emits 'typing', we broadcast it to others
//   socket.on('typing', () => {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });

//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on('stop typing', () => {
//     socket.broadcast.emit('stop typing', {
//       username: socket.username
//     });
//   });

//   // when the user disconnects.. perform this
//   socket.on('disconnect', () => {
//     if (addedUser) {
//       --numUsers;

//       // echo globally that this client has left
//       socket.broadcast.emit('user left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//   });
// });

// http.listen(port, function() {
// 	console.log('Listening on *:' + port);
// });

app.use("/graphql",expressgraphql({
	schema:schema,
	graphiql: true
}));

app.listen(7050,()=>{
 	console.log("We've got a server!");
 	console.log("Your routes will be running on http://localhost:7050");
});