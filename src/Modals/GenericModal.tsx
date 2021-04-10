import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const GenericModal = ({
  closeCallback,
  submitCallback,
  children,
  title,
  extraButtons = [],
  submitTitle,
}) => {
  return (
    <Dialog open={true} onClose={closeCallback} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {extraButtons.map(({ title, callback }) => (
          <Button key={title} color="primary" onClick={callback}>
            {title}
          </Button>
        ))}
        {submitCallback && (
          <Button onClick={submitCallback} color="primary">
            {submitTitle}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
