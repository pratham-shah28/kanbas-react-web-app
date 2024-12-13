import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import * as client from "../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

export default function DetailsPageButtons(){
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>({});
    const { pathname } = useLocation();
    const navigate = useNavigate();
    
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
    <div className="d-flex justify-content-center">
        <button
          id="wd-preview-btn"
          className="btn btn-lg btn-secondary me-1"
          onClick={() => navigate(`${pathname}/preview`)}
        >
          Preview
        </button>
        <button
          id="wd-preview-btn"
          className="btn btn-lg btn-secondary me-1"
          //onClick={() => alert(qid)}
          onClick={() => navigate(`${pathname}/edit`)}
        >
        <FaPencil
          className="text-danger me-2 mb-1"
        />
          Edit
        </button>
        </div>
        <hr />
    </div>
  );
}
