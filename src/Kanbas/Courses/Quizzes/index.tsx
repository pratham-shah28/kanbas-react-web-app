import { IoEllipsisVertical } from "react-icons/io5";
import { LessonControlButtons, LessonControlButtonsLight } from "./LessonControlButtons";
import { BsGripVertical, BsFillRocketTakeoffFill } from "react-icons/bs";
import { PiLineVertical } from "react-icons/pi";
import { FaCaretDown, FaCircle, FaTrash, FaTimesCircle } from "react-icons/fa";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FacultyAndAdminRestricted, FacultyRestricted } from "./ProtectedRoutes";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  editQuiz,
  updateQuiz as updateQuizAction,
} from "./reducer";
import QuizListScreenControls from "./QuizListScreenControls";

import GreenCheckmark from "../Modules/GreenCheckmark";
import QuizOptionsMenu from "./QuizOptionsMenu";
import { getMostRecentAttempt } from "./client";
import ProtectedRoute from "../../Account/ProtectedRoute";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer || []); // const assignments = db.assignments;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      
      // Fetch most recent attempts for all quizzes
      const quizzesWithScores = await Promise.all(
        quizzes.map(async (quiz: any) => {
          try {
            const attempt = await getMostRecentAttempt(currentUser._id, quiz._id);
            return { ...quiz, score: attempt.score };
          } catch (error) {
            console.error(`Failed to fetch attempt for quiz ${quiz._id}:`, error);
            return { ...quiz, score: null }; // Assign null if there's an error
          }
        })
      );
  
      dispatch(setQuizzes(quizzesWithScores));
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  const fmtDate = (inputDate: string) => {
    if (!inputDate) return '';
    const d = new Date(inputDate);
    return d.toLocaleString();
  };

  const handleAvailability = (availableDate: Date, untilDate: Date) => {
    if (!availableDate || !untilDate) {
      return 'Invalid date';
    }

    const availableDateObj = new Date(availableDate);
    const untilDateObj = new Date(untilDate);

    if (isNaN(availableDateObj.getTime()) || isNaN(untilDateObj.getTime())) {
      return 'Invalid date';
    }

    const currentDate = new Date();
    const availableDateFrmt = availableDateObj.getTime();
    const untilDateFrmt = untilDateObj.getTime();
    const currentTime = currentDate.getTime();

    if (currentTime > untilDateFrmt) {
      return 'Closed';
    } else if (currentTime >= availableDateFrmt && currentTime <= untilDateFrmt) {
      return 'Available';
    } else if (currentTime < availableDateFrmt) {
      return `Not available until ${availableDateObj.toLocaleString()}`;
    }
  };

  const handleDetailsPage = (quiz: any) => {
    navigate(`${pathname}/${quiz._id}`);
  };

  const handleTakeQuizPage = (quiz: any) => {
    navigate(`${pathname}/${quiz._id}/preview`);
  };

  const clickedOnQuiz = (quiz: any) => {
    if (currentUser.role === "ADMIN" || currentUser.role === 'FACULTY') {
      navigate(`${pathname}/${quiz._id}`);
    } else if (quiz.published && (new Date() <= new Date(quiz.untilDate))) {
      navigate(`${pathname}/${quiz._id}/preview`);
    }
  };

  const handleEditQuiz = (quiz: any) => {
    navigate(`${pathname}/${quiz._id}/edit`);
  };

  const createNewQuiz = async () => {
    if (!cid) return;
    const quizName = "New Quiz";
    const newQuiz = { title: quizName, course: cid };
    try {
      const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
      dispatch(addQuiz(quiz));
      console.log("quiz: ", quiz._id);
      return quiz._id;
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };

  const handleNewQuiz = () => {
    createNewQuiz();
  };

  const handlePublishToggle = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    try {
      // Call the updateQuiz function from your client
      const response = await quizzesClient.updateQuiz(updatedQuiz);

      // Dispatch the updateQuiz action to update the Redux store
      dispatch(updateQuizAction(updatedQuiz));

      // fetchQuizzes();
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]); 

  return (
    <div>
      <ul id="wd-modules" className="list-group rounded-1">
        <FacultyAndAdminRestricted>
          <QuizListScreenControls handleNewQuiz={handleNewQuiz} />
        </FacultyAndAdminRestricted>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="wd-title">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2 fs-5" />
              Assignment Quizzes
            </div>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz: any) => {
              const isAvailable = new Date() <= new Date(quiz.untilDate);
              return (
                <li
                  className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between align-items-center"
                  key={quiz._id}
                  onClick={() => clickedOnQuiz(quiz)}
                >
                  <div className="d-flex align-items-center">
                    {quiz.published ? <GreenCheckmark /> : <FaTimesCircle />}
                    <BsFillRocketTakeoffFill className="ms-2 fs-3 green-icon me-3" />
                    <div className="d-flex align-items-center justify-content-start flex-grow-1">
                      <ul className="mb-0 list-unstyled me-3">
                        <li className="wd-assignment-name me-3">{quiz.title}
                          <span
                            className={`badge ms-2 ${isAvailable ? 'bg-success' : 'bg-danger'
                              }`}
                          >
                            {isAvailable ? 'Available' : 'Closed'}
                          </span>
                          {quiz.score !== null && (
                  <span className="ms-2 text-muted">
                    Most Recent Score: {quiz.score}%
                  </span>
                )}
                        </li>
                        <li className="wd-assignment-info me-3">
                          <span className="wd-assignment-bold">
                            {handleAvailability(quiz.availableDate, quiz.dueDate)}
                          </span>
                          <span className="wd-assignment-regular">
                            <PiLineVertical />
                          </span>
                          <span className="wd-assignment-bold">Due</span>
                          <span className="wd-assignment-regular">{fmtDate(quiz.dueDate)}</span>
                          <span className="wd-assignment-regular">
                            <PiLineVertical />
                          </span>
                          <span className="wd-assignment-regular">{quiz.points} pts</span>
                          <span className="wd-assignment-regular">
                            <PiLineVertical />
                          </span>
                          <span className="wd-assignment-regular">{quiz.numQuestions} Questions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <FacultyAndAdminRestricted>
                      <button
                        type="button"
                        className="btn btn-lg me-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublishToggle(quiz);
                        }}
                      >
                        {quiz.published ? <LessonControlButtons /> : <LessonControlButtonsLight />}
                      </button>
                      <QuizOptionsMenu quiz={quiz} onEdit={handleEditQuiz} />
                    </FacultyAndAdminRestricted>
                  </div>
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
