// components/Timer.js
import { useState, useEffect } from 'react';

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  

  useEffect(() => {
    setSeconds(initialSeconds); // Reset the timer when `initialSeconds` changes
  }, [initialSeconds]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">{seconds} seconds</h2>
    </div>
  );
};

export default Timer;
