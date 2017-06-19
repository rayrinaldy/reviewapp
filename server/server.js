var express        = require('express');
var app            = express();                               // create our app w/ express
var mongoose       = require('mongoose');                     // mongoose for mongodb
var morgan         = require('morgan');             // log requests to the console (express4)
var bodyParser     = require('body-parser');    // pull information from HTML POST (express4)
var session        = require('express-session');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser   = require('cookie-parser');
var cors           = require('cors');
var passport       = require('passport');
var flash          = require('connect-flash');
var csrf           = require('csurf');

var routes = require('./routes/index');

var port = process.env.PORT || 3000;

// var cookieOptions = {
//   key: 'XSRF-TOKEN',
//   secure: false,
//   httpOnly: false,
//   maxAge: 3600000
// };

// var csrfProtection = csrf({
//   cookie: cookieOptions
// });


mongoose.connect('mongodb://localhost/reviewapp', function(err){
 if(err){
     console.log('\x1b[36m%s\x1b[0m','Cannot connect to the database');
 } else{
     console.log('\x1b[31m','Connected to database at port','\x1b[32m','27017');
 }
});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// app.use(passport.initialize());
   
// require('./passport/passport')(passport);

app.use(routes);

app.listen(port, function() {
    console.log('Connected to port ' + port);
});