var express = require('express');
var app = express();

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var compiler = webpack(config);
var PORTNUM = 3000; //default port

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test'); //database name
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error. Database error.'));

var cardSchema = new Schema({
  title: String,
  priority: String,
  status: String,
  createdBy: String,
  assignedTo: String,
});

cardSchema.plugin(timestamps);
mongoose.model('Card', cardSchema);
var Card = mongoose.model('Card', cardSchema);

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

app.use(function(req, res, next) {
  console.log('method: ',req.method, ' url: ',req.url);
  next();
 });

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  }
}));



app.get('/', (req, res) => {
  return res.render('index');
});

app.get('/data', (req, res) => {
  Card.find({}, (err, card) => {
    if (err) return err;
    res.set('Access-Control-Allow-Origin', '*');
    return res.json(card);
  });
});


app.put('/edit/', (req, res) => {
  Card.findByIdAndUpdate(req.body.id, {
    $set: req.body
  },
  function (err, card) {
    if (err) return console.log('Error: ', err);
    return res.json(card);
  });
});


app.delete('/delete/', (req, res) => {
  Card.findByIdAndRemove({"_id":req.body.id},
  function (err, card) {
    if (err) return console.log(`Error with DELETE: ${err}`);
    return res.json(card);
  });
});

app.post('/', (req, res) => {
  var body = req.body;
  var newCard = new Card({
    title: body.title || "Title",
    priority: body.priority || "Priority",
    status: body.status || "Queue",
    createdBy: body.createdby || "Created By",
    assignedTo: body.assignedto || "Assigned To",
  });
  newCard.save( (err, data) => {
    if(err) {
      console.log(err);
    } else {
      let saveDate = new Date();
      console.log('Successfully saved. ', saveDate.toLocaleTimeString('en-US', { hour12: false }));
    }
  });
});

app.listen(PORTNUM, () => {
  console.log(`now listening on port ${PORTNUM}`);
});