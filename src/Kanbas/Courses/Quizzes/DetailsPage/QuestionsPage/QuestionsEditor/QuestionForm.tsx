import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnNumberedList,
  BtnLink,
  BtnStrikeThrough,
  BtnStyles,
  BtnRedo,
  BtnUndo,
  BtnClearFormatting,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

export enum QuestionType {
  MultipleChoice = "MultipleChoice",
  TrueFalse = "TrueFalse",
  FillInTheBlank = "FillInTheBlank",
}

export interface Question {
  _id?: string;
  quizId?: string;
  type: QuestionType;
  title: string;
  points: number;
  question: string;
  correctAnswers?: string[]; // For correct answers (MCQ: one string, TF: ["True"] or ["False"], FIB: multiple strings)
  options?: string[];        // For multiple choice options
}

interface QuestionFormProps {
  question: Question;
  onSave: (updatedQuestion: Question) => void;
}

export default function QuestionForm({ question, onSave }: QuestionFormProps) {
  const navigate = useNavigate();

  const [current, setCurrent] = useState<Question>(() => {
    const initial = { ...question };
    // Ensure arrays are defined
    initial.correctAnswers = initial.correctAnswers || [];
    initial.options = initial.options || [];
    return initial;
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent({ ...current, points: parseInt(e.target.value) });
  };

  // MULTIPLE CHOICE HANDLERS
  const handleOptionTextChange = (index: number, value: string) => {
    const updatedOptions = current.options?.map((opt, i) => (i === index ? value : opt));
    setCurrent({ ...current, options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = [...(current.options || []), ""];
    setCurrent({ ...current, options: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = current.options?.filter((_, i) => i !== index);
    setCurrent({ ...current, options: updatedOptions });
    // If the deleted option was the correct answer, clear correctAnswers
    if (current.correctAnswers && current.correctAnswers[0] === current.options?.[index]) {
      setCurrent({ ...current, options: updatedOptions, correctAnswers: [] });
    }
  };

  const handleSelectCorrectOption = (index: number) => {
    const chosenOption = current.options?.[index] || "";
    setCurrent({ ...current, correctAnswers: [chosenOption] });
  };

  // FILL IN THE BLANK HANDLERS (Use correctAnswers array directly)
  const handleBlankChange = (index: number, value: string) => {
    const updatedAnswers = current.correctAnswers?.map((ans, i) => (i === index ? value : ans));
    setCurrent({ ...current, correctAnswers: updatedAnswers });
  };

  const handleAddBlank = () => {
    const updatedAnswers = [...(current.correctAnswers || []), ""];
    setCurrent({ ...current, correctAnswers: updatedAnswers });
  };

  const handleDeleteBlank = (index: number) => {
    const updatedAnswers = current.correctAnswers?.filter((_, i) => i !== index);
    setCurrent({ ...current, correctAnswers: updatedAnswers });
  };

  // TRUE/FALSE HANDLER
  const handleTrueFalseChange = (value: boolean) => {
    // True or False means correctAnswers = ["True"] or ["False"]
    setCurrent({ ...current, correctAnswers: [value ? "True" : "False"] });
  };

  // RICH TEXT EDITOR HANDLER
  const handleEditorChange = (e: any) => {
    setCurrent({ ...current, question: e.target.value });
  };

  const handleSave = () => {
    onSave(current);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mx-3 mb-4 border border-secondary" style={{ width: "100%" }}>
      <div className="row m-3">
        <div className="col-3">
          <input
            placeholder="Question Title"
            type="text"
            value={current.title || ""}
            name="title"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={current.type}
            name="type"
            onChange={handleInputChange}
          >
            <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
            <option value={QuestionType.TrueFalse}>True/False</option>
            <option value={QuestionType.FillInTheBlank}>Fill in the blanks</option>
          </select>
        </div>
        <div className="col">
          <div className="row g-2 float-end">
            <div className="col-2 pt-2">
              <label htmlFor="points">Pts:</label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="number"
                id="points"
                name="points"
                value={current.points || 0}
                onChange={handlePointsChange}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        {/* Tips based on question type */}
        {current.type === QuestionType.MultipleChoice && (
          <>
            <small>
              Enter your question and multiple answers, then select the one correct answer.
            </small>
          </>
        )}
        {current.type === QuestionType.FillInTheBlank && (
          <>
            <small>Enter your question text, then define all correct answers (accepted blanks).</small>
          </>
        )}
        {current.type === QuestionType.TrueFalse && (
          <>
            <small>Select if True or False is correct.</small>
          </>
        )}

        <br />
        <br />
        <label htmlFor="input-1" className="form-label">
          <b>Question:</b>
        </label>
        <EditorProvider>
          <Editor
            containerProps={{ style: { width: "100%", resize: "vertical" } }}
            value={current.question || ""}
            onChange={handleEditorChange}
          >
            <Toolbar>
              <BtnUndo />
              <BtnRedo />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnBulletList />
              <BtnNumberedList />
              <BtnLink />
              <BtnClearFormatting />
              <BtnStyles />
            </Toolbar>
          </Editor>
        </EditorProvider>
        <br />
        <br />
        <p className="pt-2 border-top" style={{ fontWeight: "bold" }}>
          Answers:
        </p>
        <br />

        {/* Multiple Choice */}
        {current.type === QuestionType.MultipleChoice && (
          <div className="container">
            <ul className="list-group">
              {current.options?.map((option, i) => (
                <li key={i} className="list-group-item">
                  <div className="row py-5">
                    <div className="col-auto">
                      {/* Radio button for correct answer selection */}
                      <input
                        className="form-check-input m-2"
                        type="radio"
                        name="mcq"
                        checked={current.correctAnswers && current.correctAnswers[0] === option}
                        onChange={() => handleSelectCorrectOption(i)}
                      />
                      <label className="form-check-label pt-1">
                        {current.correctAnswers && current.correctAnswers[0] === option
                          ? <p>Correct Answer</p>
                          : <p>Possible Answer</p>}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        value={option}
                        onChange={(e) => handleOptionTextChange(i, e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        onClick={() => handleDeleteOption(i)}
                        className="btn btn-link p-0"
                        style={{ color: "inherit" }}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn m-2 float-end border-0" onClick={handleAddOption}>
              <p className="text-danger">+ Add Another Option</p>
            </button>
            <br />
            <br />
          </div>
        )}

        {/* Fill In The Blank uses correctAnswers as the list of acceptable answers */}
        {current.type === QuestionType.FillInTheBlank && (
          <div className="container">
            <ul className="list-group">
              {(current.correctAnswers || []).map((answer, i) => (
                <li key={i} className="list-group-item">
                  <div className="row py-5">
                    <div className="col-auto">
                      <label className="form-check-label pt-1">
                        Accepted Answer:
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control w-auto"
                        value={answer || ""}
                        onChange={(e) => handleBlankChange(i, e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        onClick={() => handleDeleteBlank(i)}
                        className="btn btn-link p-0"
                        style={{ color: "inherit" }}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn m-2 float-end border-0" onClick={handleAddBlank}>
              <p className="text-danger">+ Add Another Answer</p>
            </button>
            <br />
            <br />
          </div>
        )}

        {/* True/False */}
        {current.type === QuestionType.TrueFalse && (
          <div className="container">
            <div className="p-2">
              <input
                className="form-check-input m-2"
                type="radio"
                name="tf"
                checked={current.correctAnswers && current.correctAnswers[0] === "True"}
                onChange={() => handleTrueFalseChange(true)}
              />
              <label className="form-check-label pt-1">
                True
              </label>
            </div>
            <br />
            <div className="p-2">
              <input
                className="form-check-input m-2"
                type="radio"
                name="tf"
                checked={current.correctAnswers && current.correctAnswers[0] === "False"}
                onChange={() => handleTrueFalseChange(false)}
              />
              <label className="form-check-label pt-1">
                False
              </label>
            </div>
          </div>
        )}

        <div className="border-top p-3 mt-3">
          <button className="btn btn-success float-end ms-2" onClick={handleSave}>
            Save Question
          </button>
          <button className="btn btn-secondary float-end" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
