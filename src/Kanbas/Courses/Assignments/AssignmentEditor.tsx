import "bootstrap/dist/css/bootstrap.min.css";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <form>
        {assignments
          .filter((assignment) => assignment.course === cid)
          .map((assignment, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="mb-3">
                <label htmlFor={`wd-name-${index}`} className="form-label">
                  Assignment Name
                </label>
                <input
                  id={`wd-name-${index}`}
                  defaultValue={assignment.title}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor={`wd-description-${index}`}
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  id={`wd-description-${index}`}
                  className="form-control"
                  rows={5}
                  defaultValue="The very first assignment. Good luck."
                ></textarea>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-md-3 text-end">
                  <label htmlFor={`wd-points-${index}`} className="form-label">
                    Points
                  </label>
                </div>
                <div className="col-md-9">
                  <input
                    id={`wd-points-${index}`}
                    defaultValue={100}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="d-flex justify-content-end mb-2">
          <button type="button" className="btn btn-secondary me-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
