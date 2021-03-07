import React from 'react';
import Button from '@material-ui/core/Button';

const JatzButton = ({ onClick, title, color = 'primary' }) => {
  return (
    <Button onClick={onClick} variant="contained" color={color}>
      {title}
    </Button>
  );
};

//<button className="jatz-button" onClick={onClick}> {title} </button>;

export default JatzButton;
