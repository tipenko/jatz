import React, { Fragment } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import CardDetailsModal from './CardDetailsModal';

const Modals = () => {
  return (
    <Fragment>
      <Router>
        <Route
          path="*/cardDetails/:cardId"
          render={({ history, match }) => (
            <CardDetailsModal cardId={match.params.cardId} history={history} />
          )}
        />
      </Router>
    </Fragment>
  );
};

export default Modals;
