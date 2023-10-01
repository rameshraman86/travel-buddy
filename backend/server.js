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
  {
    cors: {
      origin: ['http://localhost:5173', 'https://travel-buddy-x9ue.onrender.com']
    }
  }
);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('initial_connection', payload => {
    socket.join(payload.tripID);
  });
  socket.on('send_msg', payload => {
    socket.to(payload.tripID).emit("send_msg", payload);
  });
  socket.on("disconnect", () => {
    console.log('a user disconnected');
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
const tripRoutes = require("./routes/trips-api");
const itineraryRoutes = require("./routes/itinerary-api");
const googleRoutes = require("./routes/google-api");
const aiRoutes = require("./routes/ai-api");
const messageRoutes = require("./routes/messages-api");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
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
