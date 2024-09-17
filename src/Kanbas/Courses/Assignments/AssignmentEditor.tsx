export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={10} cols={50}>
          The assignment is available online Submit a link to the landing page of
        </textarea >
        <br />
        <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        {/* Complete on your own */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" name="assignmentGroup"> 
            <option value="assignment">ASSIGNMENT</option>
            <option value="practice">Practice</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as" name="grade as"> 
            <option value="Percentage">Percentage</option>
            <option value="Absolute">Absolute</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type" name="submission type"> 
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            </select>
          </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <label htmlFor="wd-submission-type"> Online Entry Options</label><br></br>

                <input type="checkbox" id="wd-text-entry" name="wd-text-entry" value="Text Entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br></br>

                <input type="checkbox" id="wd-website-url" name="wd-website-url" value="Website URL"/>
                <label htmlFor="wd-website-url">Website URL</label><br></br>

                <input type="checkbox" id="wd-media-recordings" name="wd-media-recordings" value="Media Recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br></br>

                <input type="checkbox" id="wd-student-annotation" name="wd-student-annotation" value="Student Annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br></br>

                <input type="checkbox" id="wd-file-upload" name="wd-file-upload" value="File Upload"/>
                <label htmlFor="wd-file-upload">File Upload</label><br></br>
            </td>
        </tr>
        <tr>
        <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign Assign to</label><br /> <br />
          </td>
          <td>
          <input id="wd-assign-to" type="text" value={'Everone'} />
          </td>
        </tr>
        <tr>
          <td></td>
            <td  valign="top">
            <label htmlFor="wd-due-date">Due</label>
            </td>
            
            
        </tr>
        <tr>
        <td></td>
            <td  valign="top">
            <input id="wd-due-date" type="date"/> <br /> <br />
            </td>

        </tr>
        <tr>
        &nbsp; 
            <td>
            <label htmlFor="wd-available-from">Available From</label> 
            </td>
            <td>
            <label htmlFor="wd-available-until">Until</label><br /> 
            </td>
        </tr>
        <tr>
        &nbsp; 
        <td>
        <input id="wd-available-from" type="date"/> &nbsp; &nbsp; 
        </td>       
        <td>
        <input id="wd-available-until" type="date"/>
        </td>

        </tr>
        <tr>
          <td></td>
          <td>
            <hr />
          </td>
          <td>
            <hr />
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td align="right">
            <button>Cancel</button>
            &nbsp;
            <button>Save</button>
          </td>
        </tr>
      </table>
    </div>
);}
