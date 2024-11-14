import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { addAssignment } from "./reducer";

export default function AssignmentNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cid } = useParams();

  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const handleSave = () => {
    if (!assignmentName || !description || !dueDate || !availableFrom || !availableUntil) {
      alert("All fields must be filled out.");
      return;
    }

    if (new Date(dueDate) <= new Date(availableFrom)) {
      alert("Due date must be after available from date.");
      return;
    }

    if (new Date(dueDate) >= new Date(availableUntil)) {
      alert("Due date must be before available until date.");
      return;
    }

    if (new Date(availableFrom) >= new Date(availableUntil)) {
      alert("Available from date must be before available until date.");
      return;
    }

    dispatch(
      addAssignment({
        title: assignmentName,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
        course: cid, 
      })
    );
    navigate(`/Kanbas/Courses/${cid}/Assignments`); 
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="row mb-3">
          <label htmlFor="assignmentName" className="col-sm-2 col-form-label">
            <b>Assignment Name</b>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="assignmentName"
              className="form-control"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="Enter assignment title"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            <b>Description</b>
          </label>
          <div className="col-sm-10">
            <textarea
              id="description"
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter assignment description"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="points" className="col-sm-2 col-form-label">
            Points
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              id="points"
              className="form-control"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="dueDate" className="col-sm-2 col-form-label">
            Due Date
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="availableFrom" className="col-sm-2 col-form-label">
            Available From
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              id="availableFrom"
              className="form-control"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="availableUntil" className="col-sm-2 col-form-label">
            Available Until
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              id="availableUntil"
              className="form-control"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}