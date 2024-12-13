import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findAttemptById, getQuestions, updateAttempt } from './client';

export default function AttemptReview() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isAttemptLoading, setIsAttemptLoading] = useState(true);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (attemptId) {
      // Fetch the attempt
      findAttemptById(attemptId)
        .then((attemptData) => {
          setAttempt(attemptData);
          setIsAttemptLoading(false);

          // Fetch the questions using quizId from the attempt
          const quizId = attemptData.quizId;
          if (quizId) {
            getQuestions(quizId)
              .then((questionsData) => {
                setQuestions(questionsData);
                setIsQuestionsLoading(false);
              })
              .catch((error) => {
                console.error('Error fetching questions:', error);
                setIsQuestionsLoading(false);
              });
          } else {
            setIsQuestionsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching attempt:', error);
          setIsAttemptLoading(false);
          setIsQuestionsLoading(false);
        });
    }
  }, [attemptId]);

  // After attempt and questions are loaded, calculate and update the score if needed
  useEffect(() => {
    const updateScore = async () => {
      if (!isAttemptLoading && !isQuestionsLoading && attempt) {
        const totalAnswers = attempt.answers.length;
        const correctCount = attempt.answers.filter((answer: any) => answer.correct).length;
        const scorePercentage =
          totalAnswers > 0 ? ((correctCount / totalAnswers) * 100).toFixed(2) : '0.00';

        // Update attempt score if not up-to-date
        if (attempt.score !== scorePercentage) {
          try {
            const updatedAttemptData = { ...attempt, score: scorePercentage };
            await updateAttempt(attempt._id, updatedAttemptData);
            setAttempt(updatedAttemptData); // Update local state with new score
            console.log('Attempt score updated successfully.');
          } catch (error) {
            console.error('Error updating attempt:', error);
          }
        }
      }
    };

    updateScore();
  }, [isAttemptLoading, isQuestionsLoading, attempt]);

  if (isAttemptLoading || isQuestionsLoading) {
    return (
      <div className="container py-4">
        <p>Loading review...</p>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="container py-4">
        <p>No attempt found.</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container py-4">
        <h1>Attempt Review</h1>
        <p>No questions found for this quiz.</p>
      </div>
    );
  }

  // Create a lookup map for quick access to question data by ID
  const questionMap = questions.reduce((acc: any, q: any) => {
    acc[q._id] = q;
    return acc;
  }, {});

  // Calculate score percentage for display
  const totalAnswers = attempt.answers.length;
  const correctCount = attempt.answers.filter((answer: any) => answer.correct).length;
  const scorePercentage =
    totalAnswers > 0 ? ((correctCount / totalAnswers) * 100).toFixed(2) : '0.00';

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Attempt Review</h1>
          <span className="text-muted" style={{ fontSize: '2em' }}>
            (Score: {scorePercentage}%)
          </span>
        </div>
        <button
          id="wd-back-btn"
          className="btn btn-lg btn-secondary"
          onClick={() => navigate(-2)}
        >
          Back
        </button>
      </div>
      {attempt.answers && attempt.answers.length > 0 ? (
        <div>
          {attempt.answers.map((answer: any, idx: number) => {
            const question = questionMap[answer.questionId];
            const correctAnswers = question?.correctAnswers || [];
            return (
              <div key={idx} className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Question {idx + 1}</h5>
                  <p className="card-text">
                    <strong>Question Text:</strong>{' '}
                    {question ? question.question : 'Question not found'}
                  </p>
                  <p className="card-text">
                    <strong>Your Answer:</strong> {answer.selectedOption}
                    {answer.correct ? (
                      <span className="badge bg-success ms-2">Correct</span>
                    ) : (
                      <span className="badge bg-danger ms-2">Incorrect</span>
                    )}
                  </p>
                  {!answer.correct && question && correctAnswers.length > 0 && (
                    <p className="card-text">
                      <strong>Correct Answer(s):</strong> {correctAnswers.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No answers recorded.</p>
      )}
    </div>
  );
}






