const express = require('express');
const mustacheExpress =require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const morgan =require('morgan');
const app = express();


mongoose.connect('mongodb://wicca:RxuD0Dih3tlt6hWT@node-rest-shop-shard-00-00-hffyi.mongodb.net:27017,node-rest-shop-shard-00-01-hffyi.mongodb.net:27017,node-rest-shop-shard-00-02-hffyi.mongodb.net:27017/test?ssl=true&replicaSet=Node-Rest-Shop-shard-0&authSource=admin&retryWrites=true',
{ useNewUrlParser: true }
).then(()=>{console.log('database connected.')})



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

const mustacheExpressInstan = mustacheExpress();
mustacheExpressInstan.cache= null;

app.engine('mustache', mustacheExpressInstan);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/',routes);



app.listen(3000, ()=>{
    console.log('listening on port 3000')
});