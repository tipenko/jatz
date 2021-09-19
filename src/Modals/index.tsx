import React, { Fragment } from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CardDetailsModal from './CardDetailsModal';
import AddCardModal from './AddCardModal';
import AddLogRecordModal from './AddLogRecordModal';

const ModalsComponent = ({ addingCard, addingLogRecord }) => {
  const isAdding = !isEmpty(addingCard);

  return (
    <Fragment>
      {isAdding && <AddCardModal columnName={addingCard.addingToColumn} />}
      {addingLogRecord && <AddLogRecordModal />}
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
  ({ modals: { addingCard, addingLogRecord } }) => ({
    addingCard,
    addingLogRecord
  }),
  null
)(ModalsComponent);
