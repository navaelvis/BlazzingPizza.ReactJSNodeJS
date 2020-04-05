import React from 'react';
import TopBar from './components/topBar/topBar';
import Main from './components/main/main';
import MyOrders from './components/orderList/myOrders';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <div className="content" >
        <Router>
          <Route path="/" component={Main} exact ></Route>
          <Route path="/myOrders" component={MyOrders} ></Route>
        </Router>
        {/* <Main /> */}
      </div>
    </React.Fragment>
  );
}

export default App;