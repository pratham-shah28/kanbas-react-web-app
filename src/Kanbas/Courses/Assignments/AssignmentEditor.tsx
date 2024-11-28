import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAssignment } from "./reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  );

  const [assignmentName, setAssignmentName] = useState(assignments.title);
  const [description, setDescription] = useState(assignments.description);
  const [points, setPoints] = useState(assignments.points);
  const [dueDate, setDueDate] = useState(assignments.dueDate);
  const [availableFrom, setAvailableFrom] = useState(assignments.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(
    assignments.availableUntil
  );

  if (!assignments) {
    return <div>Assignment not found</div>;
  }

  const handleSave = async (assignment: any) => {
    if (
      !assignmentName ||
      !description ||
      !dueDate ||
      !availableFrom ||
      !availableUntil
    ) {
      alert("All fields must be filled out.");
      return;
    }

    if (new Date(dueDate) <= new Date(availableFrom)) {
      alert("Due date must be after available from date.");
      return;
    }

    if (new Date(dueDate) > new Date(availableUntil)) {
      alert("Due date must be before available until date.");
      return;
    }

    if (new Date(availableFrom) >= new Date(availableUntil)) {
      alert("Available from date must be before available until date.");
      return;
    }
    if (!cid) return;
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-4">
      <form id="assignmentForm">
        <div className="row mb-3">
          <label htmlFor="assignmentName" className="col-sm-2 col-form-label">
            <b>Assignment Name</b>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="assignmentName"
              name="assignmentName"
              className="form-control"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
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
              name="description"
              className="form-control"
              cols={45}
              rows={15}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {assignments.description}
            </textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="points" className="col-sm-2 col-form-label">
            Points
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              id="points"
              name="points"
              className="form-control"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">
            Online Entry Options
          </label>
          <div className="col-sm-8">
            <div className="form-check">
              <input
                type="checkbox"
                id="textEntry"
                name="textEntry"
                className="form-check-input"
                value="Text Entry"
              />
              <label className="form-check-label" htmlFor="textEntry">
                Text Entry
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="websiteUrl"
                name="websiteUrl"
                className="form-check-input"
                value="Website URL"
              />
              <label className="form-check-label" htmlFor="websiteUrl">
                Website URL
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="mediaRecordings"
                name="mediaRecordings"
                className="form-check-input"
                value="Media Recordings"
              />
              <label className="form-check-label" htmlFor="mediaRecordings">
                Media Recordings
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="studentAnnotation"
                name="studentAnnotation"
                className="form-check-input"
                value="Student Annotation"
              />
              <label className="form-check-label" htmlFor="studentAnnotation">
                Student Annotation
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                id="fileUploads"
                name="fileUploads"
                className="form-check-input"
                value="File Uploads"
              />
              <label className="form-check-label" htmlFor="fileUploads">
                File Uploads
              </label>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="assignTo" className="col-sm-2 col-form-label">
            Assign To
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              id="assignTo"
              name="assignTo"
              className="form-control"
              value="Everyone"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="dueDate" className="col-sm-2 col-form-label">
            Due Date
          </label>
          <div className="col-sm-8">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
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
          <div className="col-sm-8">
            <input
              type="date"
              id="availableFrom"
              name="availableFrom"
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
          <div className="col-sm-8">
            <input
              type="date"
              id="availableUntil"
              name="availableUntil"
              className="form-control"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="col-sm-10">
          <div className="float-end">
            <Link
              to={`/Kanbas/Courses/${cid}/Assignments`}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleSave({
                _id: aid,
                title: assignmentName,
                description,
                points,
                dueDate,
                availableFrom,
                availableUntil
              })}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}