import React, { Fragment, useMemo, useState } from 'react';
import find from 'lodash/find';

import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import uniq from 'lodash/uniq';
import reduce from 'lodash/reduce';

import map from 'lodash/map';

import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import useDrawer from '../Drawer';
import generateTime from '../utils/generateTime';
import { formatDate } from '../utils/formatDate';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const quantsPerDay = 7 * 24 * 60 * 60 * 1000;

const checkPairInRange = (startMoment, endMoment, [startTime, endTime]) => {
  const startTimeInRange = startTime >= startMoment && startTime <= endMoment;
  const endTimeInRange = endTime >= startMoment && endTime <= endMoment;
  const eventIncludesRange = startTime <= startMoment && endTime >= endMoment;
  return startTimeInRange || endTimeInRange || eventIncludesRange;
};

const checkPairsInRange = (startMoment, endMoment, pairs) => {
  return !!find(pairs, (pair) =>
    checkPairInRange(startMoment, endMoment, pair)
  );
};

const checkCardInRange = (startMoment, endMoment) => ({
  workingPeriodsTimes: pairs,
}) => checkPairsInRange(startMoment, endMoment, pairs);

function startOfWeek(date) {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(new Date(date.setDate(diff)).setHours(0, 0, 0));
}

const addDays = (days, date) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const addWeek = (date) => addDays(7, date);

const cardArrayToSingularCardReference = (start, end) => (cards) =>
  reduce(
    cards,
    (accumulator, card) => {
      const rangesThatRelateToToday = filter(card.workingPeriodsTimes, (pair) =>
        checkPairInRange(start, end, pair)
      );
      const singularRefs = map(rangesThatRelateToToday, (range) => ({
        range,
        card,
      }));

      return [...accumulator, ...singularRefs];
    },
    []
  );

const Cal = ({ allCards }) => {
  const { renderDrawer, open } = useDrawer();
  const classes = useStyles();
  const [startingMoment, setSm] = useState(
    startOfWeek(new Date(generateTime()))
  );
  const endingMoment = useMemo(() => addWeek(startingMoment), [startingMoment]);

  const thisWeekCards = useMemo(
    () => filter(allCards, checkCardInRange(startingMoment, endingMoment)),
    [startingMoment]
  );

  const columns = useMemo(() => {
    return weekdays.map((name, index) => {
      const dayStart = addDays(index, startingMoment);
      const dayEnd = addDays(index + 1, startingMoment);
      const check = checkCardInRange(dayStart, dayEnd);
      const toRefs = cardArrayToSingularCardReference(dayStart, dayEnd);
      return {
        name,
        index,
        refs: toRefs(filter(thisWeekCards, check)),
      };
    });
  }, [thisWeekCards]);

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
      <div class="calendar-grid">
        <Paper className="calendar-header">
          <Typography variant="h5">
            {formatDate(startingMoment)} - {formatDate(endingMoment)}
          </Typography>
        </Paper>

        {columns.map(({ name, index, refs }) => (
          <Paper className="calendar-column">
            <Typography variant="subtitle1">{name}</Typography>
            {refs.map(({ range, card }, index) => (
              <div className="calendar-event">{card.content}</div>
            ))}
          </Paper>
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const columns = state.board;

  const allCards = reduce(
    columns,
    (allCards, column) => {
      return [...allCards, ...column.cards];
    },
    []
  );

  return { allCards };
};

export default connect(mapStateToProps)(Cal);
