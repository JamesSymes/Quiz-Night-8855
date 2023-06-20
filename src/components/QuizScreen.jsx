import React, { useEffect, useState } from 'react';
import he from 'he';
import Timer from './Timer';
import LoadingScreen from './LoadingScreen';
import '../styles/quiz.css';

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const { correct_answer, incorrect_answers } = currentQuestion;
      const answers = shuffleArray([...incorrect_answers, correct_answer]);
      setShuffledAnswers(answers);
    }
  }, [questions, currentQuestionIndex]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy');
      const data = await response.json();
      const newQuestions = data.results.map((question) => {
        return {
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          type: question.type,
        };
      });
      setQuestions(newQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= questions.length ? 0 : newIndex;
    });
    setShowNextQuestion(false);
    setHighlightCorrectAnswer(false);
  };

  const handleTimeUp = () => {
    if (!showNextQuestion) {
      setHighlightCorrectAnswer(true);
      setShowNextQuestion(true);
    } else {
      goToNextQuestion();
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!quizStarted) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswerIndex = shuffledAnswers.indexOf(currentQuestion.correct_answer);

  return (
    <div className="container">
      <div className="quiz-screen">
        {showNextQuestion ? (
          <Timer 
            questionTime={15} 
            answerTime={10} 
            onQuestionTimeUp={goToNextQuestion} 
            onAnswerTimeUp={handleTimeUp} 
            start={true} 
          />
        ) : (
          <Timer 
            questionTime={15} 
            answerTime={10} 
            onQuestionTimeUp={handleTimeUp} 
            onAnswerTimeUp={goToNextQuestion} 
            start={true} 
          />
        )}
        <div>
          <div className="question-container">
            <h3 id="question">{currentQuestion.question ? he.decode(currentQuestion.question) : ''}</h3>
          </div>
          <div className="options-container">
            {currentQuestion.type === 'multiple' && shuffledAnswers.map((answer, index) => (
              <div
                className={`option ${highlightCorrectAnswer && index === correctAnswerIndex ? 'correct-answer' : ''}`}
                key={index}
              >
                {answer ? he.decode(answer) : ''}
              </div>
            ))}
            {currentQuestion.type === 'boolean' && (
              <div>
                <div 
                  className={`option ${highlightCorrectAnswer && currentQuestion.correct_answer === 'True' ? 'correct-answer' : ''}`}
                >
                  True
                </div>
                <div 
                  className={`option ${highlightCorrectAnswer && currentQuestion.correct_answer === 'False' ? 'correct-answer' : ''}`}
                >
                  False
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default QuizScreen;
















// WITH NO OPTION QUESTIONS

// import React, { useEffect, useState } from 'react';
// import he from 'he';
// import Timer from './Timer';
// import LoadingScreen from './LoadingScreen';
// import '../styles/quiz.css';

// const QuizScreen = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [showNextQuestion, setShowNextQuestion] = useState(false);
//   const [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
//   const [shuffledAnswers, setShuffledAnswers] = useState([]);
//   const [hiddenOptionsQuestions, setHiddenOptionsQuestions] = useState([]);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     if (questions.length) {
//       const currentQuestion = questions[currentQuestionIndex];
//       const { correct_answer, incorrect_answers } = currentQuestion;
//       const answers = shuffleArray([...incorrect_answers, correct_answer]);
//       setShuffledAnswers(answers);
//     }
//   }, [questions, currentQuestionIndex]);

//   const fetchQuestions = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy');
//       const data = await response.json();
//       const newQuestions = data.results.map((question, index) => {
//         // Randomly decide whether to hide choices (25% of the time they are hidden for multiple-choice questions)
//         if (question.type === 'multiple' && Math.random() > 0.75) {
//           setHiddenOptionsQuestions((prevHidden) => [...prevHidden, index]);
//         }
//         return {
//           question: question.question,
//           correct_answer: question.correct_answer,
//           incorrect_answers: question.incorrect_answers,
//           type: question.type,
//         };
//       });
//       setQuestions(newQuestions);
//       setQuizStarted(true);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const goToNextQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) => {
//       const newIndex = prevIndex + 1;
//       return newIndex >= questions.length ? 0 : newIndex;
//     });
//     setShowNextQuestion(false);
//     setHighlightCorrectAnswer(false);
//   };

//   const handleTimeUp = () => {
//     if (!showNextQuestion) {
//       setHighlightCorrectAnswer(true);
//       setShowNextQuestion(true);
//     } else {
//       goToNextQuestion();
//     }
//   };

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (!quizStarted) {
//     return null;
//   }

//   const currentQuestion = questions[currentQuestionIndex];
//   const correctAnswerIndex = shuffledAnswers.indexOf(currentQuestion.correct_answer);
//   const hideOptions = hiddenOptionsQuestions.includes(currentQuestionIndex);

//   return (
//     <div className="container">
//       <div className="quiz-screen">
//         {showNextQuestion ? (
//           <Timer 
//             questionTime={15} 
//             answerTime={10} 
//             onQuestionTimeUp={goToNextQuestion} 
//             onAnswerTimeUp={handleTimeUp} 
//             start={true} 
//           />
//         ) : (
//           <Timer 
//             questionTime={15} 
//             answerTime={10} 
//             onQuestionTimeUp={handleTimeUp} 
//             onAnswerTimeUp={goToNextQuestion} 
//             start={true} 
//           />
//         )}
//         <div>
//           <div className="question-container">
//             <h3 id="question">{currentQuestion.question ? he.decode(currentQuestion.question) : ''}</h3>
//           </div>
//           {!hideOptions ? (
//             <div className="options-container">
//               {currentQuestion.type === 'multiple' && shuffledAnswers.map((answer, index) => (
//                 <div
//                   className={`option ${highlightCorrectAnswer && index === correctAnswerIndex ? 'correct-answer' : ''}`}
//                   key={index}
//                 >
//                   {answer ? he.decode(answer) : ''}
//                 </div>
//               ))}
//               {currentQuestion.type === 'boolean' && (
//                 <div>
//                   <div 
//                     className={`option ${highlightCorrectAnswer && currentQuestion.correct_answer === 'True' ? 'correct-answer' : ''}`}
//                   >
//                     True
//                   </div>
//                   <div 
//                     className={`option ${highlightCorrectAnswer && currentQuestion.correct_answer === 'False' ? 'correct-answer' : ''}`}
//                   >
//                     False
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className={`hidden-answer ${highlightCorrectAnswer ? 'revealed' : ''}`}>
//               <h3>{highlightCorrectAnswer ? he.decode(currentQuestion.correct_answer) : '?'}</h3>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
  

// };

// function shuffleArray(array) {
//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//   }
//   return shuffledArray;
// }

// export default QuizScreen;



















// import React, { useState, useEffect } from 'react';
// import { fetchQuestions } from '../utils/api';

// function QuizScreen({ isLoading }) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetchQuestions()
//       .then(data => {
//         setQuestions(data.results);
//       })
//       .catch(error => {
//         console.error(error);
//         alert('Failed to fetch questions. Please try again later.');
//       });
//   }, []);

//   function handleNextQuestion() {
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//   }

//   if (isLoading) {
//     return (
//       <div id="loading-screen">
//         <h2>Loading...</h2>
//         <div id="loading-spinner"></div>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return <div>No questions available.</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   if (!currentQuestion) {
//     return <div>Question not found.</div>;
//   }

//   return (
//     <div id="quiz-screen">
//       <h2>Question {currentQuestionIndex + 1}</h2>
//       <h3>{currentQuestion.question}</h3>
//       <div className="options-container">
//         {currentQuestion.options &&
//           currentQuestion.options.map((option, index) => (
//             <div className="option" key={index} onClick={handleNextQuestion}>
//               {option}
//             </div>
//           ))}
//       </div>
//       <button id="next-btn" onClick={handleNextQuestion}>
//         Next
//       </button>
//     </div>
//   );
// }

// export default QuizScreen;

