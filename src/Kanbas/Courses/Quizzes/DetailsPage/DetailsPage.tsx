import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import * as client from "../client";
import DetailsPageButtons from "./DetailsPageButtons";
import { editQuiz } from "../reducer";
import "./styles.css"

export default function AssignmentEditor() {
  const { cid } = useParams();
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});

  function formatDate(dateString: string): string {
    if (!dateString) return ''; // Handle empty or undefined date strings
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Handle invalid date strings
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = date.toLocaleString('en-US', options);
    const [monthDay, time] = formattedDate.split(', ');
    const [timeWithoutMinutes] = time.split(':');
    return `${monthDay} at ${timeWithoutMinutes} ${time.slice(-2).toLowerCase()}`;
  }
    
    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
      };

    useEffect(() => {
      if (qid) fetchQuiz();
      }, [qid]);
      if (!qid) return null;

  return (
    <div>
    <div> 
    < DetailsPageButtons
    />
    </div>
    <div className="quiz-title">
      {quiz.title}
    </div>
    <ul className="list-unstyled large-margin-left">
  {[
    { label: "Quiz Description", value: quiz.desc },
    { label: "Quiz Type", value: quiz.quizType },
    { label: "Points", value: quiz.points },
    { label: "Assignment Group", value: quiz.assignmentGroup },
    { label: "Shuffle Answers", value: quiz.shuffleAnswers },
    { label: "Time Limit", value: `${quiz.timeLimit} Minutes` },
    { label: "Multiple Attempts", value: quiz.howManyAttempts },
    { label: "View Responses", value: quiz.viewResponses },
    { label: "Show Correct Answers", value: quiz.showCorrectAnswers },
    { label: "Access Code", value: quiz.accessCode },
    { label: "One Question at a Time", value: quiz.oneQuestionAtATime },
    { label: "Require Respondus LockDown Browser", value: quiz.requireLockdownBrowser },
    { label: "Required to View Quiz Results", value: quiz.requiredToViewResults },
    { label: "Webcam Required", value: quiz.webCamRequired },
    { label: "Lock Questions After Answering", value: quiz.lockQuestionsAfterAnswering },
  ].map((item, index) => (
    <li key={index} className="d-flex justify-content-between">
      <span className="quiz-item text-end mb-2" style={{ flex: 1 }}>{item.label}</span>
      <span className="quiz-item-value ms-3 mb-2" style={{ flex: 2 }}>
      {typeof item.value === 'boolean' ? (item.value ? 'Yes' : 'No') : item.value}
        </span>
    </li>
  ))}
</ul>
<div>
  <div className="d-flex justify-content-between evenly-spaced">
    <span className="quiz-item-dates bold-text">Due</span>
    <span className="quiz-item-dates bold-text">For</span>
    <span className="quiz-item-dates bold-text">Available from</span>
    <span className="quiz-item-dates bold-text">Until</span>
  </div>
  <hr />
  <div className="d-flex justify-content-between evenly-spaced">
    <span className="quiz-item-value-dates">{formatDate(quiz.dueDate)}</span>
    <span className="quiz-item-value-dates">{(quiz.for)}</span>
    <span className="quiz-item-value-dates">{formatDate(quiz.availableDate)}</span>
    <span className="quiz-item-value-dates">{formatDate(quiz.untilDate)}</span>
  </div>
</div>
    </div>
  );
}
