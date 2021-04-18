import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import useDrawer from '../Drawer';

const currentDate = '2018-11-01';
const schedulerData = [
  {
    startDate: '2018-11-01T09:45',
    endDate: '2018-11-01T11:00',
    title: 'Meeting',
  },
  {
    startDate: '2018-11-01T12:00',
    endDate: '2018-11-01T13:30',
    title: 'Go to a gym',
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const { renderDrawer, open } = useDrawer();
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          {renderDrawer()}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={open}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Task calendar
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState currentDate={currentDate} />
          <DayView startDayHour={9} endDayHour={14} />
          <Appointments />
        </Scheduler>
      </Paper>
    </Fragment>
  );
};
