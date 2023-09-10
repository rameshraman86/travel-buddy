// load .env data into process.env
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.json());

//setup cors
const cors = require('cors');
app.use(cors());
const io = new Server(server,
  { cors: { origin: 'http://localhost:5173' } }
);


const users = [];

io.on('connection', socket => {
  console.log('a user connected');
  // emit will take 2 params; a string which will be the name or action and a payload which is a package in some form sent from the backend to the client. 
  
  // const name = "user" + Math.round(Math.random() * 10000);
  // users.push(name);
  socket.emit('intial_conn');
  
  socket.on('identify', payload => {
    users.push(payload.email)
    socket.broadcast.emit('new_users', { name: payload.email });
    socket.emit('after_conn', { users })
  })

  socket.on('send_msg', payload => {
    io.emit("send_msg", payload);
  });

  socket.on("disconnect" , () => {
    console.log('a user disconnected')
  });

});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const tripRoutes = require("./routes/trips-api");
const itineraryRoutes = require("./routes/itinerary-api");
const googleRoutes = require("./routes/google-api");
const aiRoutes = require("./routes/ai-api");
const messageRoutes = require("./routes/messages-api");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/messages", messageRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
