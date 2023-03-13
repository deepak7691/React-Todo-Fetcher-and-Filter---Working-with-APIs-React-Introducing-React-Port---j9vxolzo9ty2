import React from 'react';

export const Todo = ({ id, title, completed }) => {
  return (
    <div className="todo" id={`todo-${id}`}>
      <div className="todo-title">{title}</div>
      <div className="todo-status">{completed ? 'Complete' : 'Incomplete'}</div>
    </div>
  );
};
