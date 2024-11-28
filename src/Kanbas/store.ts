import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Courses/Enrollments/reducer";
import enrollmentReducer from "./EnrollmentReducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer, 
    enrollmentsReducer,
    enrollmentReducer
  },
});
export default store;