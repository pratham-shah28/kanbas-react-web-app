

// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import EditAccess from "./Courses/EditAccess";
// import EditAccessStudents from "./Courses/EditAccessStudents";
// import { fetchAllCourses } from "./Courses/client";
// import * as enrollmentsClient from "./Courses/Enrollments/client";

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
//   enrolling,
//   setEnrolling,
//   updateEnrollment,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (courseId: string) => void;
//   updateCourse: () => void;
//   enrolling: boolean;
//   setEnrolling: (enrolling: boolean) => void;
//   updateEnrollment: (courseId: string, enrolled: boolean) => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
//   const [allCourses, setAllCourses] = useState<any[]>([]);

//   useEffect(() => {
//     if (enrolling) {
//       fetchAllCourses().then((data) => setAllCourses(data));
//     }
//   }, [enrolling]);

//   const handleDelete = async (event: React.MouseEvent, courseId: string) => {
//     event.preventDefault();
//     await deleteCourse(courseId);
//     if (enrolling) {
//       setAllCourses(allCourses.filter((c) => c._id !== courseId));
//     }
//   };

//   useEffect(() => {
//     if (!enrolling) {
//       const fetchEnrolledCourses = async () => {
//         try {
//           const enrolledCourses = await enrollmentsClient.fetchEnrollments(currentUser._id);
//           setAllCourses(enrolledCourses);
//         } catch (error) {
//           console.error("Failed to fetch enrolled courses:", error);
//         }
//       };
//       fetchEnrolledCourses();
//     }
//   }, [enrolling, currentUser._id]);

//   const isEnrolled = (courseId: string) =>
//     enrollments.some(
//       (enrollment: any) =>
//         enrollment.user === currentUser._id && enrollment.course === courseId
//     );

//   const filteredCourses = enrolling
//     ? allCourses
//     : courses.filter((course) =>
//         enrollments.some(
//           (enrollment: any) =>
//             enrollment.user === currentUser._id &&
//             enrollment.course === course._id
//         )
//       );

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard
//       <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
//           {enrolling ? "My Courses" : "All Courses"}
//         </button></h1> <hr />
//       <EditAccessStudents>
//         <h5>
//           Enrollments
//           {/* <button
//             className="btn btn-primary float-end"
//             id="wd-enrollments-course-click"
//             onClick={() => setEnrolling(!enrolling)}
//           >
//             {enrolling ? "Show Enrolled Courses" : "Show All Courses"}
//           </button> */}
//         </h5>
//         <br />
//       </EditAccessStudents>
//       <hr />
//       <EditAccess>
//         <h5>
//           New Course
//           <button
//             className="btn btn-primary float-end"
//             id="wd-add-new-course-click"
//             onClick={addNewCourse}
//           >
//             {" "}
//             Add{" "}
//           </button>
//           <button
//             className="btn btn-warning float-end me-2"
//             id="wd-update-course-click"
//             onClick={updateCourse}
//           >
//             Update
//           </button>
//         </h5>

//         <br />
//         <input
//           value={course.name}
//           className="form-control mb-2"
//           onChange={(e) => setCourse({ ...course, name: e.target.value })}
//         />
//         <textarea
//           value={course.description}
//           className="form-control"
//           onChange={(e) =>
//             setCourse({ ...course, description: e.target.value })
//           }
//         />
//       </EditAccess>
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//       </h2>{" "}
//       <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {filteredCourses.map((course) => (
//             <div key={course._id} className="col" style={{ width: "300px" }}>
//               <div className="card">
//                 <Link
//                   to={`/Kanbas/Courses/${course._id}/Home`}
//                   className="wd-dashboard-course-link text-decoration-none text-dark"
//                 >
//                   <img
//                     src={`/images/${course._id}.png`}
//                     width="100%"
//                     height={160}
//                     alt={`${course.name}`}
//                     onError={(e) => {
//                       e.currentTarget.src = "/images/reactjs.png";
//                     }}
//                   />
//                   <div className="card-body">
//                     <h5 className="wd-dashboard-course-title card-title">
//                       {course.name}{" "}
//                     </h5>
//                     <p
//                       className="wd-dashboard-course-title card-text overflow-y-hidden"
//                       style={{ maxHeight: 100 }}
//                     >
//                       {course.description}{" "}
//                     </p>
//                     <button className="btn btn-primary"> Go </button>

//                     <EditAccess>
//                       <button
//                         onClick={(event) => handleDelete(event, course._id)}
//                         className="btn btn-danger float-end"
//                         id="wd-delete-course-click"
//                       >
//                         Delete
//                       </button>

//                       <button
//                         id="wd-edit-course-click"
//                         onClick={(event) => {
//                           event.preventDefault();
//                           setCourse(course);
//                         }}
//                         className="btn btn-warning me-2 float-end"
//                       >
//                         Edit
//                       </button>
//                     </EditAccess>

//                     {enrolling && (
//                       <EditAccessStudents>
//                         <button
//                           onClick={(event) => {
//                             event.preventDefault();
//                             updateEnrollment(
//                               course._id,
//                               !isEnrolled(course._id)
//                             );
//                           }}
//                           className={`btn ${
//                             course.enrolled ? "btn-danger" : "btn-success"
//                           } float-end`}
//                         >
//                           {course.enrolled ? "Unenroll" : "Enroll"}
//                         </button>
//                       </EditAccessStudents>
//                     )}
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { fetchAllCourses } from "./Courses/client";
// import * as enrollmentsClient from "./Courses/Enrollments/client";
// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
//   enrolling,
//   setEnrolling,
//   updateEnrollment,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
//   enrolling: boolean;
//   setEnrolling: (enrolling: boolean) => void;
//   updateEnrollment: (course: string, enrolled: boolean) => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const [allCourses, setAllCourses] = useState<any[]>([]);
//     const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
//   const filteredCourses = enrolling
//     ? allCourses
//     : courses.filter((course) =>
//         enrollments.some(
//           (enrollment: any) =>
//             enrollment.user === currentUser._id &&
//             enrollment.course === course._id
//         )
//       );

//   useEffect(() => {
//     if (enrolling) {
//       fetchAllCourses().then((data) => setAllCourses(data));
//     }
//   }, [enrolling]);

//     useEffect(() => {
//     if (!enrolling) {
//       const fetchEnrolledCourses = async () => {
//         try {
//           const enrolledCourses = await enrollmentsClient.fetchEnrollments(currentUser._id);
//           setAllCourses(enrolledCourses);
//         } catch (error) {
//           console.error("Failed to fetch enrolled courses:", error);
//         }
//       };
//       fetchEnrolledCourses();
//     }
//   }, [enrolling, currentUser._id]);

//   useEffect(() => {
//   if (!enrolling && currentUser) {
//     const fetchEnrolledCourses = async () => {
//       try {
//         const enrolledCourses = await enrollmentsClient.fetchEnrollments(currentUser._id);
//         // Assuming enrolledCourses contains course data directly:
//         setAllCourses(enrolledCourses);
//       } catch (error) {
//         console.error("Failed to fetch enrolled courses:", error);
//       }
//     };
//     fetchEnrolledCourses();
//   }
// }, [enrolling, currentUser]);

//   return (
//     <div id="wd-dashboard">
//       <button
//         onClick={() => setEnrolling(!enrolling)}
//         className="float-end btn btn-primary"
//       >
//         {enrolling ? "My Courses" : "All Courses"}
//       </button>
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>
//         New Course
//         <button
//           className="btn btn-primary float-end"
//           id="wd-add-new-course-click"
//           onClick={addNewCourse}
//         >
//           Add
//         </button>
//         <button
//           className="btn btn-warning float-end me-2"
//           onClick={updateCourse}
//           id="wd-update-course-click"
//         >
//           Update
//         </button>
//       </h5>
//       <br />
//       <input
//         value={course.name}
//         className="form-control mb-2"
//         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//       />
//       <textarea
//         value={course.description}
//         className="form-control"
//         onChange={(e) => setCourse({ ...course, description: e.target.value })}
//       />
//       <hr />
//       <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//       </h2>{" "}
//       <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {filteredCourses.map((course) => (
//             <div className="wd-dashboard-course col" style={{ width: "300px" }}>
//               <div className="card">
//                 <Link
//                   to={`/Kanbas/Courses/${course._id}/Home`}
//                   className="wd-dashboard-course-link text-decoration-none text-dark"
//                 >
//                   <img src="/images/reactjs.jpg" width="100%" />
//                   <div className="card-body">
//                     {enrolling && (
//                       <button
//                         onClick={(event) => {
//                           event.preventDefault();
//                           updateEnrollment(course._id, !course.enrolled);
//                         }}
//                         className={`btn ${
//                           course.enrolled ? "btn-danger" : "btn-success"
//                         } float-end`}
//                       >
//                         {course.enrolled ? "Unenroll" : "Enroll"}
//                       </button>
//                     )}
//                     <h5 className="wd-dashboard-course-title card-title">
                      
//                       {course.name}
//                     </h5>
//                     <p
//                       className="card-text overflow-y-hidden"
//                       style={{ maxHeight: 100 }}
//                     >
//                       {course.description}
//                     </p>
//                     <button className="btn btn-primary"> Go </button>
//                     <button
//                       onClick={(event) => {
//                         event.preventDefault();
//                         deleteCourse(course._id);
//                       }}
//                       className="btn btn-danger float-end"
//                       id="wd-delete-course-click"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       id="wd-edit-course-click"
//                       onClick={(event) => {
//                         event.preventDefault();
//                         setCourse(course);
//                       }}
//                       className="btn btn-warning me-2 float-end"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
} : {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: string) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log('Courses:', courses);
  console.log('Enrolling:', enrolling);


  console.log('Enrolled Courses:', courses.filter(course => course && course.enrolled));

  

  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {currentUser.role === "FACULTY" || currentUser.role === "ADMIN" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            placeholder="Course Name"
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            placeholder="Course Description"
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {enrolling
            ? `Published Courses (${courses.length})`
            : `Enrolled Courses (${courses.length})`}
        </h2>
        {currentUser.role === "STUDENT" && (
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </div>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5">
          {courses.map((course) => 
            course ? (
            <div
              key={course._id}
              className="wd-dashboard-course col mb-3 mt-3"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                >
                  <img
                    style={{ objectFit: "contain" }}
                    src="/images/reactjs.png"
                    alt ="image"
                    width="100%"
                    height={160}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>

                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <button
                        className="btn btn-primary"
                      >
                        Go
                      </button>
                      {currentUser.role === "STUDENT" && enrolling && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                          className={`btn ${
                            course.enrolled ? "btn-danger" : "btn-success"
                          } float-end`}
                        >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {currentUser.role === "FACULTY" && (
                        <div>
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
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ): <></>)}
        </div>
      </div>
    </div>
  );
}