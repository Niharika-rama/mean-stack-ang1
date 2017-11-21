var express = require('express');

//engines = require('consolidate'); 
//invoke express into a variable
app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
//backend routes
//use router objects for this route files
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
//middle ware
app.use(bodyParser.json());//parses application /json
app.use(bodyParser.urlencoded({'extended':true})); 
//giving access to all front end files  through static
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);




mongoose.connect('mongodb://localhost:27017/Angular',function(err){
    if(err){
        console.log("connection failure to database"+err);
    }
    else{
        console.log("connected to mongodb");
    }
});




app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//process.env.PORT (if envi has specific server use it)
app.listen(2006,function(){
console.log("App is listeniing to 2006");
});

