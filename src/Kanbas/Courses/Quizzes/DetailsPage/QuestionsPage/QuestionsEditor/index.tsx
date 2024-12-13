import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../../../client"; // API client
import "./index.css";
import QuestionForm from "./QuestionForm";

export default function QuestionsEditor() {
  const { qid, questionId } = useParams<{ qid: string; questionId: string }>();
  const [editedQuestion, setEditedQuestion] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // fetchQuestion to be edited...
  const fetchQuestion = async () => {
    try {
      const question = await client.getQuestionById(qid, questionId);
      setEditedQuestion(question);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save updates to the current question
  const handleSave = async (updatedQuestion: any) => {
    try {
      await client.updateQuestion(qid, updatedQuestion._id, updatedQuestion);
      alert("Question saved successfully!");
      navigate(-1); 
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [qid, questionId]);


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="editor-container mt-5">
      <div style={{ marginLeft: "150px", marginRight: "150px" }}>
        {editedQuestion ? (
          <QuestionForm
            question={editedQuestion}
            onSave={handleSave}
          />
        ) : (
          <div>No question found. Please try again.</div>
        )}
      </div>
    </div>
  );
}
