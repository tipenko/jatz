import React, { Fragment, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withTitle from '../utils/withTitle';

import format from '../utils/formatDate';

const MyTimelineItem = ({ logEvent, isLast }) => {
  return (
    <Fragment key={logEvent.time}>
      {format(logEvent.time)}
      {logEvent.getShortText()}
    </Fragment>
  );
};

const LogEventTimeline = ({ logEvents }) => {
  const sortedLogEvents = useMemo(() => sortBy(logEvents, ['time']), [
    logEvents,
  ]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLogEvents.map((logEvent) => (
            <TableRow key={logEvent.time}>
              <TableCell align="right">{format(logEvent.time)}</TableCell>
              <TableCell align="right">{logEvent.type}</TableCell>
              <TableCell align="right">
                {withTitle(logEvent.getLongText())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogEventTimeline;
