import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { finishAddLogRecord, cancelAddLogRecord } from './actionCreators';
import GenericModal from './GenericModal';
import TextField from '@material-ui/core/TextField';

const AddLogRecordModalComponent = ({ finishAddLogRecord, cancelAddLogRecord }) => {
  const [content, setContent] = useState('');
  const changeHandler = useCallback((event) => setContent(event.target.value), [
    setContent,
  ]);
  const closeCallback = useCallback(() => cancelAddLogRecord(), [cancelAddLogRecord]);

  const submitCallback = useCallback(() => {
    finishAddLogRecord(content);
  }, [finishAddLogRecord, content]);

  return (
    <GenericModal
      closeCallback={closeCallback}
      submitCallback={submitCallback}
      submitTitle="Add"
      title="Add Log Record"
    >
      <TextField
        multiline
        label="What happened?"
        fullWidth
        value={content}
        rows={12}
        autoFocus
        onChange={changeHandler}
        variant="outlined"
      />
    </GenericModal>
  );
};

export default connect(null, {
  finishAddLogRecord,
  cancelAddLogRecord,
})(AddLogRecordModalComponent);
