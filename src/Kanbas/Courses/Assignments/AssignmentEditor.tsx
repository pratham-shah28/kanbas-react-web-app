// import { Link } from "react-router-dom";
// export default function AssignmentEditor() {
//     return (
//       <div id="wd-assignments-editor">
//         <label htmlFor="wd-name">Assignment Name</label>
//         <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
//         <textarea id="wd-description" rows={10} cols={50}>
//           The assignment is available online Submit a link to the landing page of
//         </textarea >
//         <br />
//         <table>
//         <tr>
//           <td align="right" valign="top">
//             <label htmlFor="wd-points">Points</label>
//           </td>
//           <td>
//             <input id="wd-points" value={100} />
//           </td>
//         </tr>
//         {/* Complete on your own */}
//         <tr>
//           <td align="right" valign="top">
//             <label htmlFor="wd-group">Assignment Group</label>
//           </td>
//           <td>
//             <select id="wd-group" name="assignmentGroup"> 
//             <option value="assignment">ASSIGNMENT</option>
//             <option value="practice">Practice</option>
//             </select>
//           </td>
//         </tr>
//         <tr>
//           <td align="right" valign="top">
//             <label htmlFor="wd-display-grade-as">Display Grade as</label>
//           </td>
//           <td>
//             <select id="wd-display-grade-as" name="grade as"> 
//             <option value="Percentage">Percentage</option>
//             <option value="Absolute">Absolute</option>
//             </select>
//           </td>
//         </tr>
//         <tr>
//           <td align="right" valign="top">
//             <label htmlFor="wd-submission-type">Submission Type</label>
//           </td>
//           <td>
//             <select id="wd-submission-type" name="submission type"> 
//             <option value="Online">Online</option>
//             <option value="Offline">Offline</option>
//             </select>
//           </td>
//         </tr>
//         <tr>
//             <td></td>
//             <td>
//                 <label htmlFor="wd-submission-type"> Online Entry Options</label><br></br>

//                 <input type="checkbox" id="wd-text-entry" name="wd-text-entry" value="Text Entry"/>
//                 <label htmlFor="wd-text-entry">Text Entry</label><br></br>

//                 <input type="checkbox" id="wd-website-url" name="wd-website-url" value="Website URL"/>
//                 <label htmlFor="wd-website-url">Website URL</label><br></br>

//                 <input type="checkbox" id="wd-media-recordings" name="wd-media-recordings" value="Media Recordings"/>
//                 <label htmlFor="wd-media-recordings">Media Recordings</label><br></br>

//                 <input type="checkbox" id="wd-student-annotation" name="wd-student-annotation" value="Student Annotation"/>
//                 <label htmlFor="wd-student-annotation">Student Annotation</label><br></br>

//                 <input type="checkbox" id="wd-file-upload" name="wd-file-upload" value="File Upload"/>
//                 <label htmlFor="wd-file-upload">File Upload</label><br></br>
//             </td>
//         </tr>
//         <tr>
//         <td align="right" valign="top">
//             <label htmlFor="wd-assign-to">Assign Assign to</label><br /> <br />
//           </td>
//           <td>
//           <input id="wd-assign-to" type="text" value={'Everone'} />
//           </td>
//         </tr>
//         <tr>
//           <td></td>
//             <td  valign="top">
//             <label htmlFor="wd-due-date">Due</label>
//             </td>
            
            
//         </tr>
//         <tr>
//         <td></td>
//             <td  valign="top">
//             <input id="wd-due-date" type="date"/> <br /> <br />
//             </td>

//         </tr>
//         <tr>
//         &nbsp; 
//             <td>
//             <label htmlFor="wd-available-from">Available From</label> 
//             </td>
//             <td>
//             <label htmlFor="wd-available-until">Until</label><br /> 
//             </td>
//         </tr>
//         <tr>
//         &nbsp; 
//         <td>
//         <input id="wd-available-from" type="date"/> &nbsp; &nbsp; 
//         </td>       
//         <td>
//         <input id="wd-available-until" type="date"/>
//         </td>

//         </tr>
//         <tr>
//           <td></td>
//           <td>
//             <hr />
//           </td>
//           <td>
//             <hr />
//           </td>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td align="right">
//             <button >
//               <Link to="/Kanbas/Courses/1234/Assignments">Cancel</Link>
//             </button>
//             &nbsp;
//             <button>
//             <Link to="/Kanbas/Courses/1234/Assignments">Save</Link>
//             </button>
//           </td>
//         </tr>
//       </table>
//     </div>
// );}
import React from "react";
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
          <textarea id="wd-description" className="form-control" rows={5} defaultValue="The assignment is available online. Submit a link to the landing page of"></textarea>
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
        <div className="d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
          <button type="submit" className="btn btn-danger">Save</button>
        </div>
      </form>
    </div>
  );
}