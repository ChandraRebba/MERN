var express = require('express');
var router= require('C:/Users/c.rebbapragada/Documents/Project/react-kellogg/react-kellogg/server/routes/routes.js');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser= require('cookie-parser');

mongoose.connect("mongodb://localhost:27017/MyDB",{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db= mongoose.connection;
db.on("error",console.error.bind(console,"Mongodb connection failed"))

app.use(express.static(path.join(__dirname,'../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../client'));
var port= 3000;
app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

module.exports=app;
