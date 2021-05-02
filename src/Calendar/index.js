import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import find from 'lodash/find';
import { setInitialState } from '../Board/actionCreators';
import { load } from '../Board/PersistenceLayer';

import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import uniq from 'lodash/uniq';
import reduce from 'lodash/reduce';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import map from 'lodash/map';
import { Link as RouterLink } from 'react-router-dom';
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
import withTitle from '../utils/withTitle';
import { formatDate, formatTime } from '../utils/formatDate';

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
  return new Date(new Date(date.setDate(diff)).setHours(0, 0, 0, 0));
}

const addDays = (days, date) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const addWeek = (date, weekCount = 1) => addDays(7 * weekCount, date);

const cardArrayToArrayWithMatchingRanges = (start, end) => (cards) =>
  map(cards, (card) => {
    const rangesThatRelateToToday = filter(card.workingPeriodsTimes, (pair) =>
      checkPairInRange(start, end, pair)
    );

    return {
      ranges: rangesThatRelateToToday,
      card,
    };
  });

const Cal = ({ allCards, columns, setInitialState }) => {
  const { renderDrawer, open } = useDrawer();
  const classes = useStyles();
  const lastMonday = startOfWeek(new Date(generateTime()));
  const [startingMoment, setSm] = useState(lastMonday);

  const endingMoment = useMemo(() => addWeek(startingMoment), [startingMoment]);
  const incrementWeek = useCallback(
    () => setSm((currentValue) => addWeek(currentValue)),
    [setSm]
  );

  const decrementWeek = useCallback(
    () => setSm((currentValue) => addWeek(currentValue, -1)),
    [setSm]
  );

  const thisWeekCards = useMemo(
    () => filter(allCards, checkCardInRange(startingMoment, endingMoment)),
    [startingMoment]
  );

  const isNextDisabled = startingMoment.getTime() === lastMonday.getTime();
  const isPrevActive = true;

  const eventColumns = useMemo(() => {
    return weekdays.map((name, index) => {
      const dayStart = addDays(index, startingMoment);
      const dayEnd = addDays(index + 1, startingMoment);
      const check = checkCardInRange(dayStart, dayEnd);
      const onlyTodaysRanges = cardArrayToArrayWithMatchingRanges(
        dayStart,
        dayEnd
      );
      return {
        name,
        index,
        rangesCardPairs: onlyTodaysRanges(filter(thisWeekCards, check)),
      };
    });
  }, [thisWeekCards]);

  useEffect(() => {
    if (!columns) {
      load(setInitialState);
    }
  }, []);

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
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button size="small" onClick={decrementWeek}>
              Prev
            </Button>
            <Button
              size="small"
              onClick={incrementWeek}
              disabled={isNextDisabled}
            >
              Next
            </Button>
          </ButtonGroup>
        </Paper>

        {eventColumns.map(({ name, index, rangesCardPairs }) => (
          <Paper className="calendar-column">
            <Typography variant="subtitle1">{name}</Typography>
            {rangesCardPairs.map(({ ranges, card }, index) => {
              const times = map(
                ranges,
                ([start, end]) =>
                  `${formatTime(new Date(start))}-${formatTime(new Date(end))}`
              );
              const timesStr = times.join(',');

              return (
                <div className="calendar-event">
                  <Typography
                    variant="caption"
                    component={RouterLink}
                    to={`/kanban/cardDetails/${card.uid}`}
                  >
                    {withTitle(`${timesStr} ${card.content}`)}
                  </Typography>
                </div>
              );
            })}
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

  return { allCards, columns };
};

const mapDispatchToProps = { setInitialState };

export default connect(mapStateToProps, mapDispatchToProps)(Cal);
