import React, { Fragment } from 'react';
import { Column } from './Column';
import { connect } from 'react-redux';

const BoardComponent = ({columns}) => {
  return (
    <Fragment>
      <h1> kanban board </h1>
      <div className="kanban-board">
        {columns.map(({ name, cards }) => (
          <Column name={name} cards={cards}/>
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  columns: state.board
});

export const Board = connect(mapStateToProps)(BoardComponent)
