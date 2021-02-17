import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './store';
import Modals from './Modals';
import { Board } from './Board';
import './App.global.css';

export default function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Switch>
            <Route path="/" component={Board} />
          </Switch>
        </Router>
        <Modals/>
      </DndProvider>
    </Provider>
  );
}
