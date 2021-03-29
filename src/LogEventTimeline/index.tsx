import React, { Fragment, useMemo, useState, useCallback } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineContent';

import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import dateFormat from 'dateformat';

const useStylesForMuiTimeline = makeStyles(
  {
    //missingOppositeContent: {
    //  '&::before': { content: 'none' },
    // },
    root: {
      minHeight: '40px',
    },
  },
  { name: 'MuiTimelineItem' }
);

const format = (time) => dateFormat(time, 'ddd HH:MM');

const MyTimelineItem = ({ logEvent, isLast }) => {
  return (
    <TimelineItem
      key={logEvent.time}
      title={logEvent.getLongText() + ' ' +format(logEvent.time)}
    >
      <TimelineContent>{logEvent.getShortText()}</TimelineContent>
      <TimelineSeparator>
        <TimelineDot />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineOppositeContent>{format(logEvent.time)}</TimelineOppositeContent>
    </TimelineItem>
  );
};

const LogEventTimeline = ({ logEvents }) => {
  useStylesForMuiTimeline();
  const sortedLogEvents = useMemo(() => sortBy(logEvents, ['time']), [
    logEvents,
  ]);

  return (
    <Timeline align="right">
      {map(sortedLogEvents, (logEvent, index, { length }) => (
        <MyTimelineItem isLast={index === length - 1} logEvent={logEvent} />
      ))}
    </Timeline>
  );
};

export default LogEventTimeline;
