const app = require('express')();
const specials = require('./controllers/specials');
const toppings = require('./controllers/toppings');
const orders = require('./controllers/orders');

app.use(specials);
app.use(toppings);
app.use(orders);

app.listen(1337, err => {
    if (err) {
        console.log('There was an error in the server. Try it again!');
    } else {
        console.log('Server is running and listening in port 1337');
    }
});