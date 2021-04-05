import React, { useState, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { ItemTypes } from '../../DNDConstants';
import Typography from '@material-ui/core/Typography';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const usePersistentHoverCallbacks = () => {
  const [isHover, setHover] = useState(false);
  const getListener = useCallback((value) => (event) => setHover(value), [
    setHover,
  ]);

  const onHover = useMemo(() => getListener(true), [getListener]);
  const onLeave = useMemo(() => getListener(false), [getListener]);

  return { onHover, onLeave, isHover };
};

const useStyles = makeStyles({
  root: {
    opacity: (isHover) => (isHover ? '1' : '0'),
    transitionDuration: '0.2s',
    transitionProperty: 'opacity',
  },
});

/*const useStylesForCard = makeStyles({
  root: {
     paddingBottom: 0
  },
});*/

const JCard = ({ cardObject, source }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      card: cardObject,
      source,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const { onHover, onLeave, isHover } = usePersistentHoverCallbacks();

  const styles = useStyles(isHover);

  return (
    <span
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="kanban-board-column-card"
    >
      <Card onMouseOver={onHover} onMouseLeave={onLeave} >
        <CardContent>
          <Typography variant="body2" component="p">
            {cardObject.content} + {cardObject.archivationTime}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={RouterLink}
            to={`kanban/cardDetails/${cardObject.uid}`}
            classes={styles}
          >
            EDIT
          </Button>
        </CardActions>
      </Card>
    </span>
  );
};

export default JCard;
