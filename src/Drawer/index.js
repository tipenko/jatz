import React, { useState, useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
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

const useDrawer = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const open = useCallback(() => setOpenDrawer(true), [setOpenDrawer]);
  const close = useCallback(() => setOpenDrawer(false), [setOpenDrawer]);
  const styles = useStyles();
  const matchBoard = !!useRouteMatch("/kanban");
  const matchZettelcasten = !!useRouteMatch("/zettelcasten");
  const matchCalendar = !!useRouteMatch("/calendar");

  const renderDrawer = useCallback(
    () => (
      <Drawer anchor="left" open={isOpenDrawer} onClose={close}>
        <div className={styles.list}>
          <List onClick={close}>
            <ListItem button component={RouterLink} to={'/kanban'} selected={matchBoard}>
              <ListItemIcon>
                <ViewWeekIcon />
              </ListItemIcon>

              <ListItemText primary={'Kanban Board'} />
            </ListItem>

            <ListItem button component={RouterLink} to={'/zettelcasten'} selected={matchZettelcasten}>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary={'Zettelcasten'} />
            </ListItem>

             <ListItem button component={RouterLink} to={'/calendar'} selected={matchCalendar}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'Calendar'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    ),
    [close, isOpenDrawer]
  );

  return {
    open,
    close,
    renderDrawer,
  };
};

export default useDrawer;
