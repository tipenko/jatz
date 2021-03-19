import React, { Fragment } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CardDetailsModal from './CardDetailsModal';
import AddCardModal from './AddCardModal';

const ModalsComponent = ({ state, addingCard }) => {
  const isAdding = !isEmpty(addingCard);

  return (
    <Fragment>
      {isAdding && <AddCardModal columnName={addingCard.addingToColumn} />}
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

export default connect(
  ({ modals: { addingCard } }) => ({
    addingCard,
  }),
  null
)(ModalsComponent);
