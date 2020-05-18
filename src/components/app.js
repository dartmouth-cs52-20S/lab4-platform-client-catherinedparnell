import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import NavBar from './navBar';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
      </div>
    </Router>
  );
};

export default App;
