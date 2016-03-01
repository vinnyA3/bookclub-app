var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./config/config'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    sass = require('node-sass-middleware'),
    port = process.env.PORT || 8080;

//connect to mongoose database
mongoose.connect(config.db);

//use morgan to log all requests
app.use(morgan('dev'));

//body parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cors config
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, \ Authorization');
  next();
});

//sass middleware
app.use(
  sass({
    src: __dirname + '/public/sass',
    dest: __dirname + '/public/assets/styles',
    force: true,
    debug: true,
    outputStyle: 'compressed'
  })
);

//set the location for the static files
app.use(express.static(path.join(__dirname,'/public')));

//include AUTH routes
var authRoutes = require('./app/routes/auth-routes.js')(app,express);
app.use('/auth',authRoutes);
//include API Authenticated routes
var apiRoutes = require('./app/routes/api-routes.js')(app,express);
app.use('/api', apiRoutes);

//get * route
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//start server and listen on port
server.listen(port, function(){
  console.log('Server is listening on port: ' + port + '...');
});
