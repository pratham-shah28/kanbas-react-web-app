import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as client from "../client";
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

export default function QuizEditor() {
    const { qid } = useParams<{ qid: string }>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [originalQuiz, setOriginalQuiz] = useState<any>(null);
    const [quizData, setQuizData] = useState<any>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                if (!qid) {
                    return;
                }
                const fetchedQuiz = await client.findQuizById(qid);
                setOriginalQuiz(fetchedQuiz);
                setQuizData(fetchedQuiz); // Initialize editable data with fetched data
            } catch (err) {
                console.error("Error fetching quiz:", err);
            }
        };
        fetchQuiz();
    }, [qid]);

    // RICH TEXT EDITOR HANDLER
  const handleEditorChange = (e: any) => {
    setQuizData({
        ...quizData,
        desc: e.target.value });
  };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (!quizData) return;

        const target = e.target;
        const name = target.name;
        let updatedValue: any;

        if (target instanceof HTMLInputElement) {
            if (target.type === "checkbox") {
                updatedValue = target.checked;
            } else if (target.type === "number") {
                updatedValue = Number(target.value);
            } else {
                updatedValue = target.value;
            }
        } else if (target instanceof HTMLSelectElement) {
            updatedValue = target.value;
        } else if (target instanceof HTMLTextAreaElement) {
            updatedValue = target.value;
        }

        setQuizData({
            ...quizData,
            [name]: updatedValue,
        });
    };

    // Updated handlePublish Function
    const handlePublish = async (e: FormEvent) => {
        e.preventDefault();
        if (!quizData) return;

        const updatedQuizData = { ...quizData, published: true };

        try {
            await client.updateQuiz(updatedQuizData);
            navigate(-1);
        } catch (err) {
            console.error("Error publishing quiz:", err);
        }
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!quizData) return;

        const { name, value } = e.target;
        setQuizData({
            ...quizData,
            [name]: value,
        });
    };

    const formatForInput = (dateString: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
        return localISOTime;
    };

    // Updated handleSave Function
    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!quizData) return;

        try {
            await client.updateQuiz(quizData);
            navigate(-1);
        } catch (err) {
            console.error("Error updating quiz:", err);
        }
    };

    const handleCancel = () => {
        if (originalQuiz) {
            setQuizData(originalQuiz);
            navigate(-1);
        }
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const formattedDate = date.toLocaleString("en-US", options);
        const [monthDay, time] = formattedDate.split(", ");
        const [hour, minute] = time.split(":");
        return `${monthDay} at ${hour}:${minute} ${time.slice(-2).toLowerCase()}`;
    };

    if (!quizData) {
        return (
            <div className="container my-5">
                <p>Loading quiz data...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="mb-4">
                <button type="button" className="btn btn-primary me-2">
                    Details
                </button>
                <button type="button" className="btn btn-secondary"
                    onClick={() => navigate(`${pathname}/questions`)}>
                    Questions
                </button>
            </div>
            <h1 className="mb-4">Edit Quiz Details</h1>
            <form className="quiz-editor-form">
                {/* Quiz Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Quiz Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={quizData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Quiz Description */}
                <div className="mb-3">
                    <label htmlFor="input-1" className="form-label">
                        <b>Quiz Description:</b>
                    </label>
                    <EditorProvider>
                        <Editor
                            containerProps={{ style: { width: "100%", resize: "vertical" } }}
                            value={quizData.desc || ""}
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
                </div>

                <div className="mb-3">
                    <label htmlFor="quizType" className="form-label">Quiz Type</label>
                    <select
                        className="form-select"
                        id="quizType"
                        name="quizType"
                        value={quizData.quizType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Quiz Type</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True/False">True/False</option>
                        <option value="Short Answer">Short Answer</option>
                    </select>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="gradedQuiz"
                        name="gradedQuiz"
                        checked={quizData.gradedQuiz}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="gradedQuiz">Graded Quiz</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="points" className="form-label">Points</label>
                    <input
                        type="number"
                        className="form-control"
                        id="points"
                        name="points"
                        value={quizData.points}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
                    <select
                        className="form-select"
                        id="assignmentGroup"
                        name="assignmentGroup"
                        value={quizData.assignmentGroup}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Assignment Group</option>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Homework">Homework</option>
                        <option value="Projects">Projects</option>
                    </select>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="shuffleAnswers"
                        name="shuffleAnswers"
                        checked={quizData.shuffleAnswers}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="shuffleAnswers">Shuffle Answers</label>
                </div>

                <div className="mb-3">
                    <label htmlFor="timeLimit" className="form-label">Time Limit (Minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="timeLimit"
                        name="timeLimit"
                        value={quizData.timeLimit}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="howManyAttempts" className="form-label">Multiple Attempts</label>
                    <input
                        type="number"
                        className="form-control"
                        id="howManyAttempts"
                        name="howManyAttempts"
                        value={quizData.howManyAttempts}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="viewResponses" className="form-label">View Responses</label>
                    <select
                        className="form-select"
                        id="viewResponses"
                        name="viewResponses"
                        value={quizData.viewResponses}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Option</option>
                        <option value="Always">Always</option>
                        <option value="After Last Attempt">After Last Attempt</option>
                        <option value="Never">Never</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="showCorrectAnswers" className="form-label">Show Correct Answers</label>
                    <select
                        className="form-select"
                        id="showCorrectAnswers"
                        name="showCorrectAnswers"
                        value={quizData.showCorrectAnswers}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Option</option>
                        <option value="Always">Always</option>
                        <option value="After Last Attempt">After Last Attempt</option>
                        <option value="Never">Never</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="accessCode" className="form-label">Access Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="accessCode"
                        name="accessCode"
                        value={quizData.accessCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="oneQuestionAtATime"
                        name="oneQuestionAtATime"
                        checked={quizData.oneQuestionAtATime}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="oneQuestionAtATime">One Question at a Time</label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="requireLockdownBrowser"
                        name="requireLockdownBrowser"
                        checked={quizData.requireLockdownBrowser}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="requireLockdownBrowser">
                        Require Respondus LockDown Browser
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="requiredToViewResults"
                        name="requiredToViewResults"
                        checked={quizData.requiredToViewResults}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="requiredToViewResults">
                        Required to View Quiz Results
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="webCamRequired"
                        name="webCamRequired"
                        checked={quizData.webCamRequired}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="webCamRequired">Webcam Required</label>
                </div>

                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="lockQuestionsAfterAnswering"
                        name="lockQuestionsAfterAnswering"
                        checked={quizData.lockQuestionsAfterAnswering}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
                        Lock Questions After Answering
                    </label>
                </div>

                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                        value={formatForInput(quizData.dueDate)}
                        onChange={handleDateChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="for" className="form-label">For</label>
                    <input
                        type="text"
                        className="form-control"
                        id="for"
                        name="for"
                        value={quizData.for}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="availableDate" className="form-label">Available From</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="availableDate"
                        name="availableDate"
                        value={formatForInput(quizData.availableDate)}
                        onChange={handleDateChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="untilDate" className="form-label">Until Date</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="untilDate"
                        name="untilDate"
                        value={formatForInput(quizData.untilDate)}
                        onChange={handleDateChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary me-2" onClick={handleSave}>
                        Save Changes
                    </button>
                    <button type="submit" className="btn btn-primary me-2" onClick={handlePublish}>
                        Save & Publish
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
