var datTarjeta = require('../Datos/datTarjeta');
const express = require("express")
const router = express.Router();

router.post('/cards', async function (req, res){
    console.log(req.body)
    await datTarjeta.createCard(req.body)
    res.send('tarjeta creada')
})

router.get('/cards', async function (req, res){
    let resp = await datTarjeta.getCard();
    res.json(resp);
})

router.get('/cards/:id', async function(req,res){
    let resp = await datTarjeta.getCardID(req.params.id);
    res.json(resp);
});

router.delete('/cards/:id', async function(req,res){
    await datTarjeta.deleteCard(req.params.id);
    res.send('Tarjeta eliminada')
});

router.put('/cards/:id', async function(req,res){
    let resp = await datTarjeta.updateCard(req.params.id, req.body);
    res.json(resp);
});

module.exports = router;
