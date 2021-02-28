import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { setInitialState } from './actionCreators';
import { Column } from './Column';
import { load } from './PersistenceLayer';

const BoardComponent = ({ columns, setInitialState }) => {
  useEffect(() => {
    load(setInitialState);
  }, []);
  if (columns) {
    debugger;
  }
  return (
    <Fragment>
      <h1> kanban board </h1>
      <div className="kanban-board">
        {columns && columns.map(({ name, cards }) => (
          <Column name={name} cards={cards} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  columns: state.board,
});

const mapDispatchToProps = { setInitialState };

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComponent);
