import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Board } from './board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.global.css';

const KanbanBoard = () => <DndProvider backend={HTML5Backend}><Board/></DndProvider>

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={KanbanBoard} />
      </Switch>
    </Router>
  );
}
