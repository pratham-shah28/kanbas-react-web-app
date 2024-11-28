import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, { payload }) => {
            state.enrollments = payload;
        },
        enrollCourse: (state, { payload: { userId, courseId } }) => {
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: userId,
                course: courseId,
                enrollmentDate: new Date().toISOString(),
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        unenrollCourse: (state, { payload: { userId, courseId } }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => !(e.user === userId && e.course === courseId)
            );
        },
    },
});

export const {
    enrollCourse,
    unenrollCourse,
    setEnrollments
} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;