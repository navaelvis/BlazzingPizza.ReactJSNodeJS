const toppings = require('express').Router();
const db = require('./db');

toppings.get('/toppings', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(await db.knex.select().table('toppings'));
});

module.exports = toppings;