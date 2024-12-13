import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import AssignmentNew from "./Assignments/AssignmentNew";
import { Navigate,Routes,Route, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { courses } from "../Database";
import Quizzes from "./Quizzes";
import DetailsPage from "./Quizzes/DetailsPage/DetailsPage";
import QuizEditor from "./Quizzes/DetailsPage/QuizDetailsEditor";
import QuestionsEditor from "./Quizzes/DetailsPage/QuestionsPage/QuestionsEditor/";
import QuestionsList from "./Quizzes/DetailsPage/QuestionsPage/QuestionsList";
import QuizPreview from "./Quizzes/QuizPreview";
import AttemptReview from "./Quizzes/AttemptReview";
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name}  &gt; {pathname.split("/")[4]}</h2> <hr />

      <hr />
      <div className="d-flex">
    <div className="d-none d-md-block">
            <CoursesNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home/>} />
              <Route path="Modules" element={<Modules/>} />
              <Route path="Assignments" element={<h2><Assignments/></h2>} />
              <Route path="Assignments/:aid" element={<h2><AssignmentEditor/></h2>} />
              <Route path="Assignments/new" element={<h2><AssignmentNew/></h2>} />
              <Route path="People" element={<PeopleTable />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/:qid" element={<DetailsPage />} />
              <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
              <Route path="Quizzes/:qid/preview/:attemptId/review" element={<AttemptReview />} />
              <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
              <Route path="Quizzes/:qid/edit/questions" element={<QuestionsList />} />
              <Route path="Quizzes/:qid/edit/questions/:questionId" element={<QuestionsEditor />} />
            </Routes>
            </div></div>
    </div>
);}
