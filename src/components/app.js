import React from 'react';
import '../style.scss';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import navBar from './navBar';

const App = (props) => {
  return (
    <Router>
      <div>
        {navBar()}
      </div>
    </Router>
  );
};

export default App;
