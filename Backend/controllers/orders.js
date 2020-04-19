const orders = require('express').Router();
const db = require('./db');
const bodyParser = require('body-parser');

var ordersList, addressList, pizzasList, specialsList, toppingsList, pizzaToppingList;

var allowCrossDomainOpotions = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

orders.use(bodyParser.json());
orders.use(allowCrossDomainOpotions);

orders.get('/orders', async (req, res) => {
    await getData();
    var result = [];

    ordersList = ordersList.sort((a, b) => {
        if (a.createdTime > b.createdTime)
            return -1;
        else if (a.createdTime < b.createdTime)
            return 1;
        else {
            return 0;
        }
    });

    for (var i = 0; i < ordersList.length; i++) {
        var deliveryAddress = getDeliveryAddress(ordersList[i].deliveryAddressId);

        var pizzas = getPizzas(ordersList[i].orderId);

        var order = buildOrder(ordersList[i], deliveryAddress, pizzas);

        result.push(order);
    }

    console.log('/orders - GET method');
    res.send(result);
});

orders.get('/orders/:orderId', async (req, res) => {
    var orderId = req.param('orderId');

    await getDataForOrderId(orderId);

    console.log('/orders/:orderId - GET method');
    if (ordersList == undefined || ordersList.length == 0)
        res.send('null order');
    else {
        var deliveryAddress = getDeliveryAddress(ordersList[0].deliveryAddressId);
        var pizzas = getPizzas(orderId);

        res.send(buildOrder(ordersList[0], deliveryAddress, pizzas));
    }
});

orders.post('/orders', async (req, res) => {
    var data = req.body;
    var addressId = await db.knex.insert({
        name: data.address.name,
        line1: data.address.line1,
        line2: data.address.line2,
        city: data.address.city,
        region: data.address.region,
        postalCode: data.address.postalCode
    }).into('address');

    var orderId = await db.knex.insert({ 
        userId: data.userId,
        createdTime: data.date,
        deliveryAddressId: addressId
    }).into('orders');
    
    data.pizzas.forEach(async (pizza) => {
        var pizzaId = await db.knex.insert({ 
            orderId: orderId, 
            specialId: pizza.specialId, 
            size: pizza.size 
        }).into('pizzas');

        pizza.toppings.forEach(async (topping) => {
            await db.knex.insert({ 
                toppingId: topping.toppingId, 
                pizzaId: pizzaId 
            }).into('pizzatopping');
        });
    });

    console.log('/orders - POST method');
    res.send(String(orderId));
});

async function getData() {
    ordersList = await db.knex.select().table('orders');
    pizzasList = await db.knex.select().table('pizzas');
    pizzaToppingList = await db.knex.select().table('pizzaTopping');
    await getSpecialsToppingsAndAddress();
}

async function getDataForOrderId(orderId) {
    ordersList = await db.knex.select().table('orders').where('orderId', orderId);
    pizzasList = await db.knex.select().table('pizzas').where('orderId', orderId);
    pizzaToppingList = await db.knex.select().table('pizzaTopping');
    await getSpecialsToppingsAndAddress();
}

async function getSpecialsToppingsAndAddress() {
    specialsList = await db.knex.select().table('specials');
    toppingsList = await db.knex.select().table('toppings');
    addressList = await db.knex.select().table('address');
}

function getDeliveryAddress(deliveryAddressId) {
    for (var j = 0; j < addressList.length; j++) {
        if (addressList[j].id == deliveryAddressId) {
            return {
                id: addressList[j].id,
                name: addressList[j].name,
                line1: addressList[j].line1,
                line2: addressList[j].line2,
                city: addressList[j].city,
                region: addressList[j].region,
                postalCode: addressList[j].postalCode
            }
        }
    }
}

function getPizzas(orderId) {
    var pizzas = [];
    var pizza;
    for (var k = 0; k < pizzasList.length; k++) {
        var special;
        for (var l = 0; l < specialsList.length; l++) {
            if (pizzasList[k].specialId == specialsList[l].id) {
                special = {
                    id: specialsList[l].id,
                    name: specialsList[l].name,
                    basePrice: parseFloat(specialsList[l].basePrice),
                    description: specialsList[l].description,
                    imageUrl: specialsList[l].imageUrl
                }
            }
        }

        var toppings = [];
        for (var m = 0; m < pizzaToppingList.length; m++) {
            if (pizzaToppingList[m].pizzaId == pizzasList[k].id) {
                for (var n = 0; n < toppingsList.length; n++) {
                    if (pizzaToppingList[m].toppingId == toppingsList[n].id) {
                        var item = {
                            id: toppingsList[n].id,
                            price: parseFloat(toppingsList[n].price),
                            pizzaId: pizzaToppingList[m].pizzaId
                        }
                        toppings.push(item);
                    }
                }
            }
        }

        if (orderId == pizzasList[k].orderId) {
            pizza = {
                id: pizzasList[k].id,
                orderId: pizzasList[k].orderId,
                special: special,
                specialId: pizzasList[k].specialId,
                size: pizzasList[k].size,
                toppings: toppings,
            }
            pizzas.push(pizza);
        }
    }

    return pizzas;
}

function buildOrder(order, deliveryAddress, pizzas) {
    return {
        order: {
            orderId: order.orderId,
            userId: order.userId,
            createdTime: order.createdTime,
            deliveryAddress: deliveryAddress,
            deliveryLocation: {
                deliveryLocation_Lalitude: order.deliveryLocation_Lalitude,
                deliveryLocation_Longitude: order.deliveryLocation_Longitude
            },
            pizzas: pizzas
        }
    };
}

module.exports = orders;