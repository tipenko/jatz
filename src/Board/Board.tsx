import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { setInitialState } from './actionCreators';
import { Column } from './Column';
import { load } from './PersistenceLayer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const BoardComponent = ({ columns, setInitialState }) => {
  useEffect(() => {
    load(setInitialState);
  }, []);

  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Kanban Board
          </Typography>
          <Button color="inherit"> Save </Button>
        </Toolbar>
      </AppBar>
      <div className="kanban-board">
        {columns &&
          columns.map(({ name, cards }) => (
            <Column name={name} cards={cards} />
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  columns: state.board,
});

const mapDispatchToProps = { setInitialState };

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComponent);
