const specials = require('express').Router();
const db = require('./db');

specials.get('/specials', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send(await db.knex.select().table('specials'));
});

module.exports = specials;