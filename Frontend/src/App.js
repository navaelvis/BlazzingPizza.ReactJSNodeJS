import React from 'react';
import TopBar from './components/topBar/topBar';
import Main from './components/main/main';
import MyOrders from './components/orderlist/myOrders';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrderDetail from './components/orderlist/orderDetail';

function App() {
  return (
    <React.Fragment>
      <Router>
        <TopBar />
        <div className="content" >
          <Route path="/" component={Main} exact ></Route>
          <Route path="/myOrders" component={MyOrders} exact ></Route>
          <Route path="/myOrders/:orderId" component={OrderDetail} ></Route>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;