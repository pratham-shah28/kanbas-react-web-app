import { useLocation, useNavigate, useParams } from "react-router";
import * as client from "../../client";
import { useEffect, useState } from "react";

export default function QuestionsList() {
  const { qid } = useParams<{ qid: string }>();
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const { pathname } = useLocation();

  const getAllQuestionss = async () => {
    const questions = await client.getQuestions(qid);
    setAllQuestions(questions);
  };

  const handleAddNewQuetion = async () => {
    const question = {
      type: 'MultipleChoice',
      title: 'Default Title',
      points: 0,
      question: 'Enter question here',
      correctAnswers: ['Option 1'],
      options: ['Option 1', 'Option 2']
    };
    const newQuestion = await client.createQuestion(qid, question);
    setAllQuestions([...allQuestions, newQuestion]);
  };

  const handleDelete = async (questionId: any) => {
    await client.deleteQuestion(qid, questionId);
    setAllQuestions(allQuestions.filter(q => q._id !== questionId));
  };

  useEffect(() => {
    getAllQuestionss();
  },); 

  const renderQuestionDetails = (question: any) => {
    switch (question.type) {
      case "MultipleChoice":
        return (
          <div>
            <h5>Question:</h5>
            {question.question}
            <hr/>
            <h6>Options:</h6>
            <ul>
              {question.options.map((option: string, index: number) => {
                const isCorrect = question.correctAnswers.includes(option);
                return (
                  <li key={index}>
                    {option} {isCorrect && <strong>(Correct)</strong>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      case "TrueFalse":
        return (
          <div>
            <h5>Question:</h5>
            {question.question}
            <hr/>
            <p><strong>Answer:</strong> {question.correctAnswers[0]}</p>
          </div>
        );
      case "FillInTheBlank":
        return (
          <div>
            <h5>Question:</h5>
            {question.question}
            <hr/>
            <h6>Accepted Answers:</h6>
            <ul>
              {question.correctAnswers.map((ans: string, index: number) => (
                <li key={index}>{ans}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const totalPoints = allQuestions.reduce((sum, question) => sum + (question.points || 0), 0);

  return (
    <div>
      <div className="container my-5">
        <div className="mb-4">
          <div className="mb-4">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => navigate(-1)}
            >
              Details
            </button>
            <button type="button" className="btn btn-primary">
              Questions
            </button>
          </div>
          <div className="mb-3">
            <strong>Total points:</strong> {totalPoints}
          </div>
          {allQuestions.map((question: any) => (
            <div key={question._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{question.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Type: {question.type}
                  </h6>
                  <p className="card-text">
                    <strong>Points:</strong> {question.points}
                  </p>
                  {renderQuestionDetails(question)}
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => navigate(`${pathname}/${question._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(question._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline-primary btn-sm me-2"
          onClick={handleAddNewQuetion}
        >
          Add Question
        </button>
      </div>
    </div>
  );
}

