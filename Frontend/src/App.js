import React from 'react';
import Main from './components/main/main';
import TopBar from './components/topBar/topBar';

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <div className="content" >
        <Main />
      </div>
    </React.Fragment>
  );
}

export default App;