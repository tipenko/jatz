import React, {useState, useCallback} from 'react';
import { connect } from 'react-redux';
import { finishAddCard, cancelAddCard } from '../Board/actionCreators';
import GenericModal from './GenericModal';
import generateUid from '../utils/generateUid';

const AddCardModalComponent = ({finishAddCard, cancelAddCard, columnName}) => {
  const [content, setContent] = useState("");
  const changeHandler = useCallback((event) => setContent(event.target.value), [
    setContent
  ]);
  const closeCallback = useCallback(() => cancelAddCard(), [cancelAddCard]);

  const submitCallback = useCallback(()=> {
    finishAddCard(columnName, generateUid(), content);//todo unix time as id
  }, [finishAddCard, content]);

  return (
    <GenericModal
      closeCallback={closeCallback}
      submitCallback={submitCallback}
      submitTitle="Add"
      title="Add New Card"
    >
      <textarea
        className="card-content-textarea"
        value={content}
        onChange={changeHandler}
      />
    </GenericModal>
  );
};

export default connect(null, {
  finishAddCard,
  cancelAddCard
})(AddCardModalComponent);
