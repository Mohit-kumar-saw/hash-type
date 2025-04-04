// src/redux/store.js
import reducer from './slice'; // Your reducer

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    reanimate: reducer, // Assign the reducer to a key, e.g., "reanimate"
  },
});
