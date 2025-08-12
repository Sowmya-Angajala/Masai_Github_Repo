import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/todoSlice';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span
              style={{
                textDecoration: todo.status ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
          </label>
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
