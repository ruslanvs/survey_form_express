// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");

var session = require( "express-session" );

// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use( session( {secret: 'codingdojorocks'} ) )

// root route to render the index.ejs view
app.get('/', function(req, res) {
    // if ( !req.session.counter )
    //     req.session.counter = 0;
    // req.session.counter ++;
    // console.log( "SESSION", req.session.counter )
    res.render( "index" );
})

app.post('/surveys/create', function(req, res) {
    req.session.counter += 1;
    res.redirect('/surveys/show');
})

app.get('/surveys/show', function(req, res) {
    req.session.counter = 0;
    res.redirect('/');
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
