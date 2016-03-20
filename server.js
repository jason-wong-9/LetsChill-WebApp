var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config')

var app = express();

app.set('views', __dirname + '/server/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
   res.sendFile(__dirname + '/public/app/views/index.html'); 
});

var port = 8080;
if (!config.dev){
  port = process.env.PORT; 
}

app.listen(port, function(err){
  if (err) {
    console.log(error);
  } else {
    console.log("Server Running on " + port); 
  }
   
});