import { useReducer } from "react";
function visibilityReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_VISIBILITY':
      return !state;
    default:
      return state;
  }
}

function ToggleVisible() {
  const [isVisible, dispatch] = useReducer(visibilityReducer, false);
  
  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_VISIBILITY' });
  };
  return (
    <div>
      <button onClick={handleToggle}>Toggle Visibility</button>
      {isVisible && <p>This content is now visible!</p>}
    </div>
  );
}
export default ToggleVisible;