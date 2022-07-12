const express = require('express');
require('./database');

const app = express();
const cors = require('cors');
const session = require("express-session");
app.set('port', process.env.PORT || 4000);

const whitelist = ['http://localhost:4000','http://localhost:3000'];
const corsOptions = {
  credentials: true, 
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}//Por usar, por probar

app.use(cors(
    //corsOptions    
));
app.use(express.json());

app.use(session({
    key: "userKey",
    secret: "123124124124",
    resave: true,
    saveUninitialized: false,
    cookie:{
        expires: 3*60*60*10000
    }
}));//Por usar (Yo me encargo :v :v :V )

app.use('/api',require('./Router/userRouter'));
app.use('/api',require('./Router/cardRouter'));


app.get('/asd',async (req,res)=>{
    res.json({prueba:'La real Prueba'});
});

const server = app.listen(app.get('port'),()=>{
    console.log('Escuchando puerto:',app.get('port'));
})