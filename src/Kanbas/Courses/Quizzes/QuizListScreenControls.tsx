import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import AdminRestricted from "./ProtectedRoutes";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import * as coursesClient from "../client";
import { addQuiz } from "./reducer";
import { useSelector } from "react-redux";
interface QuizControlsProps {
  handleNewQuiz: () => void;
}

export default function QuizListScreenControls({
    handleNewQuiz,
}: QuizControlsProps) {
  const { cid } = useParams();

  const createNewQuiz = async () => {
    if (!cid) return;
    const quizName = "New Blank Quiz";
    const newQuiz = { title: quizName, course: cid };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    console.log("quiz: ", quiz._id);
    return quiz._id;
  };
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(currentUser);

  return (
    <div id="wd-quiz-controls" className="text-nowrap mb-1">
      <div>
        <AdminRestricted>
        <button
          id="wd-btn"
          className="btn btn-lg bg-secondary me-1 float-end"
          onClick={handleNewQuiz}
        >
          <IoEllipsisVertical className="fs-4"
            style={{ bottom: "1px" }}
          />
        </button>
        <button
          id="wd-add-quiz-btn"
          className="btn btn-lg btn-danger me-1 float-end"
          onClick={handleNewQuiz}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Quiz
        </button>
        </AdminRestricted>
      
      <div className="input-group" style={{ width: "300px" }}>
        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>
        <input
          id="wd-search-input"
          type="text"
          className="form-control border-start-0"
          placeholder="Search For a Quiz"
        />
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

