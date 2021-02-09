import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Board } from './Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './store';
import './App.global.css';

const KanbanBoard = () => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  </Provider>
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={KanbanBoard} />
      </Switch>
    </Router>
  );
}
