import React, { useEffect, useState } from 'react';
import { 
  getQuestions, 
  createAttempt, 
  updateAttempt, 
  getAttemptCount, 
  findQuizById, 
  getMostRecentAttempt 
} from './client'; 
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function QuizPreview() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempt, setAttempt] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<any[]>([]); 
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const [maxAttempts, setMaxAttempts] = useState<number>(0);
  const [currentAttemptCount, setCurrentAttemptCount] = useState<number>(0);
  const [isAttemptLimitChecked, setIsAttemptLimitChecked] = useState<boolean>(false);

  const [recentAttempt, setRecentAttempt] = useState<any>(null);
  const [isRecentAttemptLoading, setIsRecentAttemptLoading] = useState<boolean>(false);

  const { qid } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchData = async () => {
      if (qid && currentUser?._id) {
        try {
          // Fetch quiz details to get maxAttempts
          const quiz = await findQuizById(qid);
          setMaxAttempts(quiz.howManyAttempts);

          // Fetch questions
          const questionsData = await getQuestions(qid);
          setQuestions(questionsData);

          // Fetch current attempt count
          const attemptCount = await getAttemptCount(currentUser._id, qid);
          setCurrentAttemptCount(attemptCount);

          // If user has reached max attempts, fetch the most recent attempt
          if (attemptCount >= quiz.howManyAttempts) {
            setIsRecentAttemptLoading(true);
            const recent = await getMostRecentAttempt(currentUser._id, qid);
            setRecentAttempt(recent);
            setIsRecentAttemptLoading(false);
          }

          setIsAttemptLimitChecked(true);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
          setIsRecentAttemptLoading(false);
        }
      }
    };

    fetchData();
  }, [qid, currentUser._id]);

  const handleStart = async () => {
    if (!qid) return;
    const userId = currentUser._id; 

    try {
      const newAttempt = await createAttempt({ quizId: qid, userId });
      setAttempt(newAttempt);
      // On starting attempt, ensure no previously stored answers or selections
      setAnswers([]);
      setSelectedOption(null);
    } catch (error) {
      console.error("Error creating attempt:", error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const determineCorrectness = (question: any, response: string | null) => {
    if (!response || !question || !question.correctAnswers) return false;
    const trimmedResponse = response.trim().toLowerCase();
    const correctSet = question.correctAnswers.map((ans: string) => ans.toLowerCase());
    console.log(correctSet);
    console.log(trimmedResponse);
    console.log(correctSet.includes(trimmedResponse));
    return correctSet.includes(trimmedResponse);
  };

  const saveAndUpdateAttempt = async (newIndex: number) => {
    if (!attempt) return;

    const question = currentQuestion;
    const questionId = question?._id;
    const updatedAnswers = [...answers];

    if (questionId && selectedOption !== null) {
      const isCorrect = determineCorrectness(question, selectedOption);
      console.log(isCorrect);
      const existingIndex = updatedAnswers.findIndex(a => a.questionId === questionId);
      const newAnswer = { questionId: questionId, selectedOption, correct: isCorrect };
      console.log(newAnswer);

      if (existingIndex === -1) {
        updatedAnswers.push(newAnswer);
      } else {
        updatedAnswers[existingIndex] = newAnswer;
      }

      try {
        const updatedAttemptData = { ...attempt, answers: updatedAnswers };
        console.log(updatedAttemptData);
        const updatedAttempt = await updateAttempt(attempt._id, updatedAttemptData);
        setAttempt(updatedAttempt);
        setAnswers(updatedAnswers);

        setCurrentQuestionIndex(newIndex);

        // If the next question has been answered before, pre-select its option
        const nextQuestionId = questions[newIndex]?._id;
        if (nextQuestionId) {
          const previouslySelected = updatedAnswers.find(a => a.questionId === nextQuestionId);
          setSelectedOption(previouslySelected ? previouslySelected.selectedOption : null);
        } else {
          setSelectedOption(null);
        }

      } catch (error) {
        console.error("Error updating attempt:", error);
      }
    } else {
      // No selected option, just navigate without updating attempt answers
      setCurrentQuestionIndex(newIndex);

      // Pre-select previously chosen option if any
      const nextQuestionId = questions[newIndex]?._id;
      if (nextQuestionId) {
        const previouslySelected = updatedAnswers.find(a => a.questionId === nextQuestionId);
        setSelectedOption(previouslySelected ? previouslySelected.selectedOption : null);
      } else {
        setSelectedOption(null);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      saveAndUpdateAttempt(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      saveAndUpdateAttempt(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Final save before submitting
    if (!attempt) return;
    const question = currentQuestion;
    const questionId = question?._id;
    const updatedAnswers = [...answers];

    if (questionId && selectedOption !== null) {
      const isCorrect = determineCorrectness(question, selectedOption);
      const existingIndex = updatedAnswers.findIndex(a => a.questionId === questionId);
      const newAnswer = { questionId, selectedOption, correct: isCorrect };

      if (existingIndex === -1) {
        updatedAnswers.push(newAnswer);
      } else {
        updatedAnswers[existingIndex] = newAnswer;
      }

      try {
        const updatedAttemptData = { ...attempt, answers: updatedAnswers };
        const updatedAttempt = await updateAttempt(attempt._id, updatedAttemptData);
        setAttempt(updatedAttempt);
        setAnswers(updatedAnswers);

        // Navigate to a review page to show selected vs correct answers
        navigate(`${pathname}/${attempt._id}/review`);

      } catch (error) {
        console.error("Error updating attempt:", error);
      }
    } else {
      // If no selection on the last question, still proceed to submit
      navigate(`${pathname}/${attempt._id}/review`);
    }
  };

  if (isLoading || !isAttemptLimitChecked || isRecentAttemptLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-secondary mb-4"
      >
        &laquo; Back
      </button>
      <h1 className="mb-4">Quiz</h1>

      {/* Conditional Rendering Based on Attempt Count */}
      {!attempt && questions.length > 0 && (
        <div className="text-center">
          {currentAttemptCount < maxAttempts ? (
            <>
              <p className="lead">Ready to start the quiz? This will start a new attempt!</p>
              <button 
                onClick={handleStart} 
                className="btn btn-primary btn-lg"
              >
                Start Quiz
              </button>
            </>
          ) : (
            <>
              {isRecentAttemptLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading recent attempt...</span>
                  </div>
                </div>
              ) : recentAttempt ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">All attempts used. Your Most Recent Attempt:</h5>
                    <p className="card-text"><strong>Score:</strong> {recentAttempt.score}</p>
                    <p className="card-text"><strong>Date:</strong> {new Date(recentAttempt.createdAt).toLocaleString()}</p>
                    <button 
                      onClick={() => navigate(`${pathname}/${recentAttempt._id}/review`)} 
                      className="btn btn-info"
                    >
                      Review Attempt
                    </button>
                  </div>
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  No attempts found.
                </div>
              )}
            </>
          )}
        </div>
      )}

      {attempt && questions.length > 0 && currentQuestion && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h5>
            <p className="card-text">{currentQuestion.question}</p>
            <form>
              {currentQuestion.type === 'MultipleChoice' && currentQuestion.options?.map((option: string, idx: number) => (
                <div className="form-check" key={idx}>
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`} 
                    id={`option-${idx}`} 
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label className="form-check-label" htmlFor={`option-${idx}`}>
                    {option}
                  </label>
                </div>
              ))}

              {currentQuestion.type === 'TrueFalse' && (
                <>
                  <div className="form-check">
                    <input 
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id="true-option"
                      value="true"
                      checked={selectedOption === 'true'}
                      onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="true-option">
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input"
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id="false-option"
                      value="false"
                      checked={selectedOption === 'false'}
                      onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="false-option">
                      False
                    </label>
                  </div>
                </>
              )}

              {currentQuestion.type === 'FillInTheBlank' && (
                <div className="mb-3">
                  <label htmlFor={`fill-blank-${currentQuestionIndex}`} className="form-label">
                    Your Answer:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`fill-blank-${currentQuestionIndex}`}
                    value={selectedOption ?? ''}
                    onChange={handleTextChange}
                  />
                </div>
              )}
            </form>
            <div className="d-flex justify-content-between mt-4">
              <button 
                onClick={handleBack} 
                disabled={currentQuestionIndex === 0} 
                className="btn btn-outline-primary"
              >
                &laquo; Back
              </button>
              {currentQuestionIndex < questions.length - 1 && (
                <button 
                  onClick={handleNext} 
                  className="btn btn-primary"
                >
                  Next &raquo;
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button 
                  onClick={handleSubmit} 
                  className="btn btn-success"
                >
                  Submit Quiz!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {attempt && questions.length === 0 && (
        <div className="alert alert-warning" role="alert">
          No questions found for this quiz.
        </div>
      )}
    </div>
  );
}
