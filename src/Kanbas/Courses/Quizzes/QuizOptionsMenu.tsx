import React, { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz as updateQuizAction } from "./reducer";
import * as quizzesClient from "./client";

interface QuizOptionsMenuProps {
  quiz: any;
  onEdit: (quiz: any) => void;
}

const QuizOptionsMenu: React.FC<QuizOptionsMenuProps> = ({ quiz, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsOpen(false);
    onEdit(quiz);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await quizzesClient.deleteQuiz(quiz._id);
        dispatch(deleteQuiz(quiz._id));
      } catch (error) {
        console.error("Failed to delete quiz:", error);
      }
    }
  };

  const handlePublishToggle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    const updatedQuiz = { ...quiz, published: !quiz.published };
    try {
      await quizzesClient.updateQuiz(updatedQuiz);
      dispatch(updateQuizAction(updatedQuiz));
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
    setIsOpen(false);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="quiz-options-menu" ref={menuRef}>
      <button
        type="button"
        className="btn btn-lg"
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up to the parent <li>
          toggleMenu();
        }}
      >
        <IoEllipsisVertical className="fs-4" />
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <button className="menu-item" onClick={handleEdit}>
            <FaEdit className="me-2" /> Edit
          </button>
          <button className="menu-item" onClick={handleDelete}>
            <FaTrash className="me-2" /> Delete
          </button>
          <button className="menu-item" onClick={handlePublishToggle}>
            <FaCircle className="me-2" /> {quiz.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizOptionsMenu;

