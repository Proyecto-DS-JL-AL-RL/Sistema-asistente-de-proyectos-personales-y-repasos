
var datState = require('../Datos/datState');
const express = require("express")
const router = express.Router();


router.get('/state/:userSub', async function(req,res){
    const resp = await datState.getState(req.params.userSub);
    res.json(resp);
});

router.post('/state/setActivity', async function(req,res){
    let resp = await datState.setActivityState(req.body);
    res.json(resp);
});




module.exports = router;