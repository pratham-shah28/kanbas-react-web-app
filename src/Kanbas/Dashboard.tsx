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

  const filteredCourses = courses;

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


// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addEnrollment, selectUserEnrollments, deleteEnrollment, setEnrollments } from "./redux/reducer";
// import * as client from "./Account/client";
// import * as courseClient from "./Courses/client";
// import * as enrollmentClient from "./Courses/enrollmentclient";
// import { enrollUserInCourse, unenrollUserFromCourse } from "./Courses/enrollmentclient";
// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
//   setCourses,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (courseId: string) => void;
//   updateCourse: () => void;
//   setCourses: React.Dispatch<React.SetStateAction<any[]>>;
// }) {
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const enrollments = useSelector((state: any) =>
//     selectUserEnrollments(state, currentUser._id)
//   ); // Use selector to get enrollments for the current user
//   //console.log("Enrollments upon start up", enrollments);

// // fetch enrollments from the server
//   // Fetch enrollments when the component mounts or currentUser changes
 
//   const fetchEnrollments = async () => {
//     if (currentUser && currentUser._id) {
//       const enrollments = await enrollmentClient.fetchEnrollments(
//         currentUser._id
//       );
      
//       // Map enrollments if necessary
//       const mappedEnrollments = enrollments.map((enrollment: any) => ({
//         ...enrollment,
//         userId: currentUser._id,
//         courseId: enrollment._id ,
//       }));
//       dispatch(setEnrollments(mappedEnrollments));
//     }
//   };
//   useEffect(() => {
//     if (currentUser && currentUser._id) {
//       fetchEnrollments();
//     }
//   }, [currentUser]);

  
//   // Toggle to show all courses
//   const [showAllCourses, setShowAllCourses] = useState(false);

// // Toggle to show all courses
// const toggleShowCourses = () => {
//   if (!showAllCourses) {
//     // When toggling to show all courses, fetch all courses
//     courseClient
//       .fetchAllCourses()
//       .then((allCourses) => {
//         setCourses(allCourses);
//         setShowAllCourses(true);
//       })
//       .catch((err) => console.error("Error fetching all courses:", err));
//   } else {
//     // If toggling back to enrolled courses, just call setCourses again with enrolled courses
//     client
//       .findMyCourses()
//       .then((enrolledCourses) => {
//         setCourses(enrolledCourses);
//         setShowAllCourses(false);
//       })
//       .catch((err) => console.error("Error fetching enrolled courses:", err));
//   }
// };

//   const enroll = async (course:any ) => {
//     try {
//       await enrollUserInCourse(course._id);
//       dispatch(addEnrollment({ userId: currentUser._id, courseId: course._id }));
//     } catch (error) {
//       console.error('Failed to enroll user in course:', error);
//     }
//   };

//   const unenroll = async (courseId: any) => {
//     try {
//       await unenrollUserFromCourse(courseId);
//       dispatch(deleteEnrollment({ userId: currentUser._id, courseId }));
//     } catch (error) {
//       console.error('Failed to unenroll user from course:', error);
//     }
//   };

  
  

//   // Filter courses based on user's role or selection
//   const filteredCourses = courses.filter((course) => {
//     //console.log('Enrollments before filtering courses:', enrollments);
//     if (currentUser.role === "FACULTY") {
//       return true;
//     } else if (showAllCourses) {
//       return true;
//     } else {
//       return enrollments.some(
//         (enrollment: any) => enrollment.courseId === course._id
//       );
//     }
//   });

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       {currentUser.role === "FACULTY" ? (
//         <>
//           <h5>
//             New Course
//             <button
//               className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={addNewCourse}
//             >
//               Add
//             </button>
//             <button
//               className="btn btn-warning float-end me-2"
//               onClick={updateCourse}
//               id="wd-update-course-click"
//             >
//               Update
//             </button>
//           </h5>
//           <br />
//           <input
//             defaultValue={course.name}
//             className="form-control mb-2"
//             onChange={(e) => setCourse({ ...course, name: e.target.value })}
//           />
//           <textarea
//             defaultValue={course.description}
//             className="form-control"
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//           />
//           <hr />
//         </>
//       ) : (
//         <button className="btn btn-primary float-end" onClick={toggleShowCourses}>
//           {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
//         </button>
//       )}

//       <h2 id="wd-dashboard-published">
//         {showAllCourses ? "All Courses" : "Published Courses"} (
//         {filteredCourses.length})
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {filteredCourses.map((course) => (
//             <div
//               className="wd-dashboard-course col"
//               style={{ width: "300px" }}
//               key={course._id}
//             >
//               <div className="card rounded-3 overflow-hidden">
//                 <Link
//                   to={`/Kanbas/Courses/${course._id}/Home`}
//                   className="wd-dashboard-course-link text-decoration-none text-dark"
//                 >
//                   <img
//                     src={`/images/${course.image}`}
//                     width="100%"
//                     height={160}
//                     alt={course.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="wd-dashboard-course-title card-title">
//                       {course.name}
//                     </h5>
//                     <p
//                       className="wd-dashboard-course-title card-text overflow-y-hidden"
//                       style={{ maxHeight: 100 }}
//                     >
//                       {course.description}
//                     </p>
//                     <button className="btn btn-primary">Go</button>

//                     {/* Render options for faculty and students */}
//                     {currentUser.role === "FACULTY" ? (
//                       <>
//                         <button
//                           onClick={(event) => {
//                             event.preventDefault();
//                             deleteCourse(course._id);
//                           }}
//                           className="btn btn-danger float-end"
//                           id="wd-delete-course-click"
//                         >
//                           Delete
//                         </button>
//                         <button
//                           id="wd-edit-course-click"
//                           onClick={(event) => {
//                             event.preventDefault();
//                             setCourse(course);
//                           }}
//                           className="btn btn-warning me-2 float-end"
//                         >
//                           Edit
//                         </button>
//                       </>
//                     ) : (
//                       <>
                      
//                         {enrollments.some(
                          
//                           (enrollment: any) => enrollment.courseId === course._id
//                         ) ? (
                          
//                           <button
//                             onClick={(event) => {
//                               event.preventDefault();
//                                unenroll(course._id);}}
//                             className="btn btn-danger float-end"
//                           >
//                             Unenroll
//                           </button>
//                         ) : (

//                           <button
//                               onClick={(event) => {
//                                 event.preventDefault(); // Prevent card click
//                                 enroll(course);
//                               }}
//                               className="btn btn-success float-end"
//                             >
//                               Enroll
//                             </button>
//                         )}
//                       </>
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