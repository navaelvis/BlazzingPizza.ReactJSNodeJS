const toppings = require('express').Router();
const db = require('./db');

toppings.get('/toppings', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var toppings = [];
    var data = await db.knex.select().table('toppings');
    for (var t = 0; t < data.length; t++) {
        var item = {
            id: data[t].id,
            name: data[t].name,
            price: parseFloat(data[t].price)
        }
        toppings.push(item);
    }
    
    console.log('/toppings - GET method');
    res.send(toppings);
});

module.exports = toppings;