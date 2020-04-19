import React from 'react';

const OrderContext = React.createContext({
    pizzas: [],
    pizzasChanged: () => {}
});

export default OrderContext;