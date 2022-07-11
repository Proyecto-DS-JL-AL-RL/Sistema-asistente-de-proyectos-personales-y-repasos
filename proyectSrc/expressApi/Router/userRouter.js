var datUser = require('../Datos/datUser');
const express = require("express")
const router = express.Router();


router.get('/users', async function(req,res){
    let resp = await datUser.getUsers();
    res.json(resp);
});

router.post('/user', async function (req, res){
    await datUser.createUser(req.body)
    res.send('user creado')
})

module.exports = router;
