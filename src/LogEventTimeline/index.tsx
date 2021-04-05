import React, { Fragment, useMemo, useState, useCallback } from 'react';

import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import dateFormat from 'dateformat';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const format = (time) => dateFormat(time, 'ddd HH:MM');

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

  return <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right"> Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLogEvents.map((logEvent) => (
            <TableRow key={logEvent.time}>
              <TableCell align="right">{format(logEvent.time)}</TableCell>
              <TableCell align="right">{logEvent.type}</TableCell>
              <TableCell align="right">{logEvent.getLongText()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
};

export default LogEventTimeline;
