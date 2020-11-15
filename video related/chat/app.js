//run npm install then npm start for it to work, should be localhost 3000 for now
//speaking of this needs combining with the rest of the site

const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(4000)



//socket.io instantiation
const io = require("socket.io")(server, {
  handlePreflightRequest: function (req, res) {
    var headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': 'http://localhost:4000',
      'Access-Control-Allow-Credentials': true
    };
    res.writeHead(200, headers);
    res.end();
  }
})


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
		console.log("Got message")
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
