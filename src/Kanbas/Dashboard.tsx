// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import * as db from "./Database";
// import { useSelector } from "react-redux";

// export default function Dashboard(
//   { courses, course, setCourse, addNewCourse,
//     deleteCourse, updateCourse }: {
//     courses: any[]; course: any; setCourse: (course: any) => void;
//     addNewCourse: () => void; deleteCourse: (course: any) => void;
//     updateCourse: () => void; }
// ) {
//   // const [courses, setCourses] = useState<any[]>(db.courses);
//   // const [course, setCourse] = useState<any>({
//   //   _id: "0", name: "New Course", number: "New Number",
//   //   startDate: "2023-09-10", endDate: "2023-12-15",
//   //   image: "/images/reactjs.jpg", description: "New Description"
//   // });
//   // const updateCourse = () => {
//   //   setCourses(
//   //     courses.map((c) => {
//   //       if (c._id === course._id) {
//   //         return course;
//   //       } else {
//   //         return c;
//   //       }
//   //     })
//   //   );
//   // };


//   // const addNewCourse = () => {
//   //   const newCourse = { ...course,
//   //                       _id: new Date().getTime().toString() };
//   //   setCourses([...courses, newCourse ]);
//   // };
//   // const deleteCourse = (courseId: string) => {
//   //   setCourses(courses.filter((course) => course._id !== courseId));
//   // };

//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = db;

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>New Course
//           <button className="btn btn-primary float-end"
//                   id="wd-add-new-course-click"
//                   onClick={addNewCourse} > Add </button>
//           <button className="btn btn-warning float-end me-2"
//                 onClick={updateCourse} id="wd-update-course-click">
//           Update
//         </button>

//       </h5>
//       <br />
//       <input    value={course.name} className="form-control mb-2"  onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
//       <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value }) } />

      
      
//       <hr />

//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.filter((course) =>
//       enrollments.some(
//         (enrollment) =>
//           enrollment.user === currentUser._id &&
//           enrollment.course === course._id
//          ))
// .map((course) => (
//             <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//               <div className="card rounded-3 overflow-hidden">
//                 <Link to={`/Kanbas/Courses/${course._id}/Home`}
//                       className="wd-dashboard-course-link text-decoration-none text-dark" >
//                   <img src="/images/reactjs.png" width="100%" height={160} />
//                   <div className="card-body">
//                     <h5 className="wd-dashboard-course-title card-title">
//                       {course.name} </h5>
//                     <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
//                       {course.description} </p>
//                     <button className="btn btn-primary"> Go </button>
//                     <button onClick={(event) => {
//                       event.preventDefault();
//                       deleteCourse(course._id);
//                     }} className="btn btn-danger float-end"
//                     id="wd-delete-course-click">
//                     Delete
//             </button>
//             <button id="wd-edit-course-click"
//   onClick={(event) => {
//     event.preventDefault();
//     setCourse(course);
//   }}
//   className="btn btn-warning me-2 float-end" >
//   Edit
// </button>


//                   </div>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>);}
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import EditAccess from "./Courses/EditAccess";
// import EditAccessStudents from "./Courses/EditAccessStudents";
import EditAccess from "./Courses/EditAccess";
import EditAccessStudents from "./Courses/EditAccessStudents";

import { enrollCourse, unenrollCourse } from "./Courses/Enrollments/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleEnroll = (courseId: string) => {
    dispatch(enrollCourse({ userId: currentUser._id, courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );

  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((course) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <EditAccessStudents>
        <h5>
          Enrollments
          <button
            className="btn btn-primary float-end"
            id="wd-enrollments-course-click"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
          </button>
        </h5>
        <br />
      </EditAccessStudents>
      <hr />
      <EditAccess>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2"
            id="wd-update-course-click"
            onClick={updateCourse}
          >
            Update
          </button>
        </h5>

        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </EditAccess>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({filteredCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {filteredCourses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={`/images/${course._id}.png`}
                    width="100%"
                    height={160}
                    alt={`${course.name}`}
                    onError={(e) => {
                      e.currentTarget.src = "/images/reactjs.png";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}{" "}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}{" "}
                    </p>
                    <button className="btn btn-primary"> Go </button>

                    <EditAccess>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>

                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </EditAccess>

                    {showAllCourses && (
                      <EditAccessStudents>
                        {isEnrolled(course._id) ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-unenroll-course-click"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(course._id);
                            }}
                            className="btn btn-success me-2 float-end"
                            id="wd-enroll-course-click"
                          >
                            Enroll
                          </button>
                        )}
                      </EditAccessStudents>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}