import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './store';
import Modals from './Modals';
import { Board } from './Board';
import Zettelcasten from './Zettelcasten';
import Calendar from './Calendar';

import './App.global.css';
import 'fontsource-roboto';

export default function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router basename="/base">
          <Switch>
            <Route exact path="/">
              <Redirect to="/kanban" />
            </Route>
            <Route path="/kanban" component={Board} />
            <Route path="/zettelcasten" component={Zettelcasten} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </Router>
        <Modals />
      </DndProvider>
    </Provider>
  );
}
