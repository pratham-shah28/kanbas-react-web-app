import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quiz._id ? quiz : m
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quizId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

export const { 
    setQuizzes, 
    addQuiz, 
    deleteQuiz,
    updateQuiz, 
    editQuiz } 
    = quizzesSlice.actions;

export default quizzesSlice.reducer;
