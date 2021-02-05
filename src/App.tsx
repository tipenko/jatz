import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Board } from './board';
import './App.global.css';

const Hello = () => {
  return <Board />;
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
