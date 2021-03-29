import React, { useMemo } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

const useStylesForMuiTimeline = makeStyles(
  {
    missingOppositeContent: {
      '&::before': { content: 'none' },
    },
    root : {
      minHeight: '40px'
    }
  },
  { name: 'MuiTimelineItem' }
);

const LogEventTimeline = ({ logEvents }) => {
  useStylesForMuiTimeline();
  const sortedLogEvents = useMemo(() => sortBy(logEvents, ['time']), [
    logEvents,
  ]);

  return (
    <Timeline>
      {map(sortedLogEvents, (logEvent, index, { length }) => {
        const isLastItem = index === length - 1;
        return (
          <TimelineItem key={logEvent.time}>
            <TimelineSeparator>
              <TimelineDot />
              {isLastItem ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>{logEvent.getText()}</TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default LogEventTimeline;
