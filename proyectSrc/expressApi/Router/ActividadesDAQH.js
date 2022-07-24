var datActividades = require('../Datos/datActividades');
const express = require("express")
const router = express.Router();


router.get('/colaActividades/:userSub', async function(req,res){
    let resp = await datActividades.getActivitiesFromUser(req.params.userSub);
    res.json(resp);
});

router.post('/colaActividades/addActividad', async function(req,res){
    let resp = await datActividades.createActivity(req.body);
    res.json(resp);
});

router.get('/colaActividades/getActividad/:userSub', async function(req,res){
    const resp = await datActividades.getActivityFromQueue(req.params.userSub);
    res.json(resp);
});

//Init
router.get('/colaActividades/actividad/:id', async function (req, res){
    const resp = await datActividades.getActivityID(req.params.id)
    res.send(resp)
})

router.delete('/colaActividades/deleteActividad/:id', async function(req,res){
    const resp = await datActividades.deleteActivity(req.params.id);
    res.send(resp)
});




module.exports = router;