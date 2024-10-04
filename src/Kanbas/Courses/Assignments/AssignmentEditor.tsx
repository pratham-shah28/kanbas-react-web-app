
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" defaultValue="A1 - ENV + HTML" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" rows={5} defaultValue="The very first assignment. Good luck."></textarea>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 text-end">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-md-9">
            <input id="wd-points" defaultValue={100} className="form-control" />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-md-3 text-end">
            <label htmlFor="wd-assignment-group" className="form-label mb-3">Assignment Group</label>
          </div>
          <div className="col-md-9 mb-3">
            <select id="wd-assignment-group" className="form-select">
              <option>ASSIGNMENTS</option><br></br>
            </select>
          </div>
          <div className="col-md-3 mb-3 text-end">
            <label htmlFor="wd-display-grade" className="form-label mt-3">Display Grade As</label>
          </div>
          <div className="col-md-9">
            <select id="wd-display-grade" className="form-select">
              <option>Percentage</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3 text-end">
            <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          </div>
          <div className="col-md-9 mb-3 border p-3 rounded">
            <select id="wd-submission-type" className="form-select">
              <option>Online</option>
            </select>  
        <div>
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="text-entry" />
            <label className="form-check-label" htmlFor="text-entry">Text Entry</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="website-url" checked/>
            <label className="form-check-label" htmlFor="website-url">Website URL</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="media-recordings" />
            <label className="form-check-label" htmlFor="media-recordings">Media Recordings</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="student-annotation" />
            <label className="form-check-label" htmlFor="student-annotation">Student Annotation</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="file-uploads" />
            <label className="form-check-label" htmlFor="file-uploads">File Uploads</label>
          </div>
         </div>
       </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-3 text-end">
            <label htmlFor="wd-submission-type" className="form-label">Assign</label>
          </div>
          <div className="col-md-9 mb-3 border p-3 rounded">
            <label htmlFor="wd-submission-type" className="form-label fw-bold">Assign</label>
            <select id="wd-submission-type" className="form-select mb-3">
              <option>Everyone</option>
            </select>  
          <div>
          <div className="col-md-13">
            <label htmlFor="wd-due" className="form-label fw-bold">Due</label>
            <input type="datetime-local" id="wd-available-from" className="form-control mb-3" />
          </div>
            <div className="d-flex mb-3">
              <div className="col-md-6 me-1">
                <label htmlFor="wd-due" className="form-label fw-bold">Available from</label>
                <input type="datetime-local" id="wd-available-from" className="form-control mb-3" />
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-due" className="form-label fw-bold">Until</label>
                <input type="datetime-local" id="wd-available-from" className="form-control" />
              </div>
           </div>
          </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-2">
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
          <button type="submit" className="btn btn-danger">Save</button>
        </div>
      </form>
    </div>
  );
}