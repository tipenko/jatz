import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EventIcon from '@material-ui/icons/Event';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const Nav = () => {
  const matchBoard = !!useRouteMatch('/kanban');
  const matchZettelcasten = !!useRouteMatch('/zettelcasten');
  const matchCalendar = !!useRouteMatch('/calendar');

  return (
    <Box m={1}>
      <ButtonGroup>
        <Button disabled={matchBoard} component={RouterLink} to={'/kanban'}>
          <ViewWeekIcon />
        </Button>
        <Button
          disabled={matchZettelcasten}
          component={RouterLink}
          to={'/zettelcasten'}
        >
          <AccountTreeIcon />
        </Button>
        <Button
          disabled={matchCalendar}
          component={RouterLink}
          to={'/calendar'}
        >
          <EventIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Nav;
