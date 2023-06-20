// StartScreen.jsx
import React from 'react';

const StartScreen = ({ onStartQuiz }) => {
  return (
    <div className="start-screen">
      <h2>Welcome to Quiz Night!</h2>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;



// // StartScreen.jsx with time adding basic
// import React, { useState } from 'react';

// const StartScreen = ({ onStartQuiz }) => {
//   const [selectedTime, setSelectedTime] = useState('Now');

//   const handleStartClick = () => {
//     onStartQuiz(selectedTime);
//   };

//   return (
//     <div className="start-screen">
//       <h2>Welcome to Quiz Night!</h2>
//       <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
//         <option value="Now">Start Now</option>
//         <option value="17:25">5:25 PM</option>
//         <option value="19:00">7:00 PM</option>
//         {/* Add as many options as you need */}
//       </select>
//       <button onClick={handleStartClick}>Start Quiz</button>
//     </div>
//   );
// };

// export default StartScreen;