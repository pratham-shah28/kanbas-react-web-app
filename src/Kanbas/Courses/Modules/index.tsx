export default function Modules() {
    return (
      <div>
        <button id="collapseButton">Collapse</button> &nbsp;  <button id="viewProgress">View Progress</button>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 3</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">React.js</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to React</li>
                  <li className="wd-content-item">Learn what is React</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 4</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">Node.js</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Node.js</li>
                  <li className="wd-content-item">Learn what is Node.js</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  