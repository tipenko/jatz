import React, { useState, useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

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

  const renderDrawer = useCallback(
    () => (
      <Drawer anchor="left" open={isOpenDrawer} onClose={close}>
        <div className={styles.list}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ViewWeekIcon />
              </ListItemIcon>

              <ListItemText primary={'Kanban Board'} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary={'Zettelcasten'} />
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
