/**
 * Created by echo on 16/12/6.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var config = require('./config/app.json');
var routes = require('./routes');
var environmentDb = process.argv[2];
var isDev;

environmentDb = environmentDb ? environmentDb:"dev";
isDev = /dev/i.test(environmentDb);
app.engine('.html',require('ejs').__express);
if(isDev){
    app.set('views',path.join(__dirname + '/views'));
}else {
    app.set('views',path.join(__dirname + '/public'));
}
app.set('view engine','html');

app.use(bodyParser.json());
if(isDev){
    app.use(express.static(__dirname + '/src'));
}else{
    app.use(express.static(__dirname + '/public'));
}

routes(app);

var port = config['port'] || 7000;
if(!module.parent){
    app.listen(port);
    console.log('Express started on port ' + port);
}
