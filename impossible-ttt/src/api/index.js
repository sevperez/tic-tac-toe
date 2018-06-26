// API - index.js

export const fetchHistory = () => {
  return new Promise(resolve => {
    const currentState = loadState();
    
    if (currentState && currentState.history) {
      resolve(currentState.history);
    } else {
      resolve(null);
    }
  });
};

export const fetchCurrentGame = () => {
  return new Promise(resolve => {
    const currentState = loadState();
    
    if (currentState && currentState.currentGame) {
      resolve(currentState.currentGame);
    } else {
      resolve(null);
    }
  });
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log("Failed to save state");
  }
};
