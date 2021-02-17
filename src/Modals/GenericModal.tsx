import React, {useCallback} from 'react';

const GenericModal = ({ closeCallback, submitCallback, children }) => {
  const cancelPropagation = useCallback((event) => event.stopPropagation());
  return (
    <div className="modal-overlay" onClick={closeCallback}>
      <div className="modal-window" onClick={cancelPropagation}>
        <div className="modal-window-header">
          <div className="modal-window-close-btn">
            <button onClick={closeCallback}>X</button>
          </div>
        </div>
        <div className="modal-window-content">{children}</div>
        <div className="modal-window-actions">{submitCallback && <button onClick={submitCallback}>submit</button> }</div>
      </div>
    </div>
  );
};

export default GenericModal;
