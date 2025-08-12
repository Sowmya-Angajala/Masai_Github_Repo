import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increment, decrement } from './counterActions';

function App() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Redux Counter</h2>
      <p>Counter Value: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>
        Decrement
      </button>

      <h4>State in JSON:</h4>
      <pre>{JSON.stringify(count , null, 2)}</pre>
    </div>
  );
}

export default App;
