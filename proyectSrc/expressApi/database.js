require("dotenv").config();
var mongoose = require('mongoose');


const mongoDB = process.env.MongoURI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('BDConnected'))
.catch(err=>console.log(err));

module.exports = mongoose;
//asd