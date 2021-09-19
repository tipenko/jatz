import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from '../Nav';
import AddLRButton from '../LogRecords/AddButton'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Zettelcasten = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Nav/>
          <AddLRButton/>
          <Typography variant="h6" className={classes.title}>
            Zettelcasten
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="zettelcasten">zettelcasten be here</div>
    </Fragment>
  );
};

export default Zettelcasten;
