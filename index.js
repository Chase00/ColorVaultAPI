// Pulling in express
require('dotenv').config(); // Imports .env and looks for the .env file to load into the processes environment
var express = require('express'); // Import express

var userController = require('./controllers/usercontroller');
var colorController = require('./controllers/colorcontroller');
var paletteController = require('./controllers/palettecontroller')

// Db connected
var sequelize = require('./db');

// Syncronizes the db connection
sequelize.sync();

// Create a new express server
var app = express();

// Tell the server to read our data as a json
app.use(express.json())

// Showing express what directory to host
app.use(express.static(__dirname + 'public'));

// Giving express to host at ../
// app.get('/', (req, res) => res.render('index'));

app.use('/api/user', userController);
app.use('/api/color', colorController);
app.use('/api/palette', paletteController);

// 'nodemon' to run with hot reload
app.listen(3000, function() {
    console.log("**** CVAULT SERVER RUNNING ****")
})