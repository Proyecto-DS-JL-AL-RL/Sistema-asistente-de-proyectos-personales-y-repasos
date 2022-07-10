var mongoose = require('mongoose');


const mongoDB = 'mongodb+srv://Alexander_Lique:<password>@cluster0.oni4k.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(db => console.log('BDConnected'))
.catch(err=>console.log(err));

module.exports = mongoose;