import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Todo } from './Todo';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data.slice(0, 20));
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  function handleCompletedCheckboxChange(event) {
    setShowCompleted(event.target.checked);
  }

  function handleIncompleteCheckboxChange(event) {
    setShowIncomplete(event.target.checked);
  }

  function filterTodos(todo) {
    if (showCompleted && showIncomplete) {
      return true;
    }
    if (showCompleted && todo.completed) {
      return true;
    }
    if (showIncomplete && !todo.completed) {
      return true;
    }
    return false;
  }

  const filteredTodos = todos.filter(filterTodos);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ol>
            {filteredTodos.map(todo => (
              <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
          </ol>
          <div id="filter-holder">
            <label>
              <input
                type="checkbox"
                id="completed-checkbox"
                checked={showCompleted}
                onChange={handleCompletedCheckboxChange}
              />
              Show Completed
            </label>
            <label>
              <input
                type="checkbox"
                id="incompleted-checkbox"
                checked={showIncomplete}
                onChange={handleIncompleteCheckboxChange}
              />
              Show Incomplete
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
