import React, { useCallback } from 'react';
import Button from '../Button';

const GenericModal = ({ closeCallback, submitCallback, children, title, extraButtons = [] }) => {
  const cancelPropagation = useCallback((event) => event.stopPropagation());
  return (
    <div className="modal-overlay" onClick={closeCallback}>
      <div className="modal-window" onClick={cancelPropagation}>
        <div className="modal-window-header">
          <div className="modal-window-header-title"> {title} </div>
          <div className="modal-window-close-btn">
            <Button onClick={closeCallback} title="X"/>
          </div>
        </div>
        <div className="modal-window-content">{children}</div>
        <div className="modal-window-actions">
        {extraButtons.map(({title, callback}) => (<Button title={title} onClick={callback}/>))}
        {submitCallback && <Button title="Update card" onClick={submitCallback}/> }</div>
      </div>
    </div>
  );
};

export default GenericModal;
