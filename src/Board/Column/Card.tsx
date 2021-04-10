import React from 'react';
import { useDrag } from 'react-dnd';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ItemTypes } from '../../DNDConstants';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  routerLink: {
    textDecoration: 'none',
    color: 'black'
  },
}));

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

  const styles = useStyles();

  return (
    <span
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card>
        <CardContent>
          <Typography
            variant="body2"
            component={RouterLink}
            to={`kanban/cardDetails/${cardObject.uid}`}
            className={styles.routerLink}
          >
            {cardObject.content}
          </Typography>
        </CardContent>
      </Card>
    </span>
  );
};

export default JCard;
