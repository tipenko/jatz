import React from 'react';
import { useDrag } from 'react-dnd';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import { ItemTypes } from '../../DNDConstants';
import Typography from '@material-ui/core/Typography';

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

  return (
    <span
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="kanban-board-column-card"
    >
      <Card>
        <CardContent>
          <Typography variant="body2" component="p">
            {cardObject.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={RouterLink}
            to={`/cardDetails/${cardObject.uid}/`}
          >
            EDIT
          </Button>
        </CardActions>
      </Card>
    </span>
  );
};

export default JCard;
