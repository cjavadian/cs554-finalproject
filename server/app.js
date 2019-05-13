const express = require("express");
const expressgraphql = require("express-graphql");
const schema =  require("./schema/schema.js")
const cors = require("cors");
const user_login = require("./user_login");
const bodyParser = require("body-parser");
const awsRoutes = require('./aws-s3/controller')



const app = express();
app.use(bodyParser.json());
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

server.listen(port, () => console.log(`Socket.io server listening on port ${port}`));


app.use("/graphql",expressgraphql({
	schema:schema,
	graphiql: true
}));

app.use("/sign_s3", awsRoutes);

app.listen(7050,()=>{
 	console.log("We've got a server!");
 	console.log("Your graphql server will be running on http://localhost:7050");
});