var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
let axios = require('axios');
const BASEURL = "http://103.28.37.34:806";
// const BASEURL = "https://tinchi.hau.edu.vn";
let config = {
  headers: { 'Content-Type': 'application/json'},
  responseType: 'application/json'
};
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('www'));
app.post("/api/:endpoint", (req, res)=>{
  console.log(req.params)
  console.log(req.query) 
   axios.post(BASEURL+ "/api/"+ req.params.endpoint, config,{params: req.query}).then(response=>{
    res.status(200).send(response.data) 
   }).catch(err=>{
    console.log(err);
    res.status(500).end(err) 
   });
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});