// App.jsx
import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import Logo from './components/Logo';
import './styles/app.css';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    // Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setQuizStarted(true);
  };

  return (
    <div className="app">
      <div className="overlay"></div> {/* Overlay div */}
      <div className="app-content"> {/* New div here */}
        <Logo />  
        {!quizStarted && !isLoading && <StartScreen onStartQuiz={handleStartQuiz} />}
        {isLoading && <LoadingScreen />}
        {quizStarted && !isLoading && <QuizScreen />}
      </div>
    </div>
  );
};

export default App;



// // App.jsx with time setting fuction and waiting page
// import React, { useState } from 'react';
// import StartScreen from './components/StartScreen';
// import WaitingScreen from './components/WaitingScreen';
// import QuizScreen from './components/QuizScreen';
// import LoadingScreen from './components/LoadingScreen';
// import Logo from './components/Logo';
// import './styles/app.css';

// const App = () => {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [startTime, setStartTime] = useState(null);

//   const handleStartQuiz = async (time) => {
//     if (time !== 'Now') {
//       setStartTime(time);
//     } else {
//       setIsLoading(true);
//       // Simulating an asynchronous operation
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       setIsLoading(false);
//       setQuizStarted(true);
//     }
//   };

//   return (
//     <div className="app">
//       <div className="overlay"></div> {/* Overlay div */}
//       <div className="app-content"> {/* New div here */}
//         <Logo />  
//         {!quizStarted && !isLoading && !startTime && <StartScreen onStartQuiz={handleStartQuiz} />}
//         {startTime && !quizStarted && <WaitingScreen startTime={startTime} />}
//         {isLoading && <LoadingScreen />}
//         {quizStarted && !isLoading && <QuizScreen />}
//       </div>
//     </div>
//   );
// };

// export default App;








// import React, { useState } from 'react';
// import StartScreen from './components/StartScreen';
// import QuizScreen from './components/QuizScreen';
// import { fetchQuestions } from './utils/api';

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [questions, setQuestions] = useState([]);

//   const handleStartQuiz = () => {
//     setIsLoading(true);
//     setCurrentQuestionIndex(0);
//     setScore(0);

//     fetchQuestions()
//       .then(data => {
//         setQuestions(data.results);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         alert('Failed to fetch questions. Please try again later.');
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="App">
//       <StartScreen onStartQuiz={handleStartQuiz} />
//       <QuizScreen
//         isLoading={isLoading}
//         currentQuestionIndex={currentQuestionIndex}
//         score={score}
//         questions={questions}
//         setScore={setScore}
//         setCurrentQuestionIndex={setCurrentQuestionIndex}
//       />
//     </div>
//   );
// }

// export default App;
