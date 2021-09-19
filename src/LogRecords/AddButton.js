import React from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {initAddLogRecord} from '../Modals/actionCreators';

const AddButton = ({initAddLogRecord}) => {
  return (
    <div className="addLogRecord">
      <Fab color="primary" onClick={initAddLogRecord}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default connect(null, {
  initAddLogRecord
})(AddButton);
