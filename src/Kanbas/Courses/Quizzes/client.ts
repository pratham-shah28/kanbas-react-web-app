import axios from "axios";
import { Questions, QuestionType, Quiz } from "./DetailsPage/QuestionsPage/interface";


const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ANSWER_API = `${QUIZZES_API}/answers`;
const ATTEMPTS_API = `${QUIZZES_API}/attempt`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateQuestion = async (qid: string | undefined, _id: any, editedQuestion: any) => {
  console.log("saving question", qid);
  const response = await axios.put(`${QUIZZES_API}/${qid}/question/${_id}`, editedQuestion);
  return response.data;
}

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
  };
  
export const deleteQuiz = async (quizId: string) => {
 const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
 return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuestion = async (quizId: any, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/question`, question);
  return response.data;
}

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const getQuestions = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
}

export const getQuestionById = async (quizId: any, questionId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/question/${questionId}`);
  return response.data;
}

export const getQuestionsByQuiz = async (qid: string) => {
  const response = await axios.get(`${QUIZZES_API}/${qid}/questions`);
  return response.data;
};


export const deleteQuestion = async (quizId: any, questionId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/question/${questionId}`);
  return response.data;
}

export const getQuizById = async (id: string) => {
  const response = await axios.get(`${QUIZZES_API}/${id}`);
  return response.data;
};

export const getAnswersByUser = async (qid: string, uid: string) => {
  const response = await axios.get(
    `${QUIZZES_API}/${qid}/users/${uid}/answers`
  );
  return response.data;
};


export const createQuizAndQuestion = async (
  cid: string,
  quiz: Quiz,
  questionSet: Questions
) => {
  const response = await axios.post(`${COURSES_API}/${cid}/quizzes/questions`, {
    quiz: quiz,
    questionSet: questionSet,
  });
  return response.data;
};

export const updateQuizAndQuestion = async (
  qid: string,
  quiz: Quiz,
  questionSet: Questions
) => {
  const response = await axios.put(`${QUIZZES_API}/${qid}/questions`, {
    quiz: quiz,
    questionSet: questionSet,
  });
  return response.data;
};

export const getLatestAnswerByUser = async (quizId: string, userId: string) => {
  const response = await axios.get(
    `${QUIZZES_API}/${quizId}/users/${userId}/answers?latest=true`
  );
  return await response.data;
};

export const submitQuizAnswers = async (
  quizId: string,
  userId: string,
  answerSet: any
) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/users/${userId}/answers`,
    answerSet
  );
  return response.data;
};

export const saveQuizAnswers = async (answerId: string, answerSet: any) => {
  const response = await axios.put(`${ANSWER_API}/${answerId}`, answerSet);
  return response.data;
};



// Create a new attempt
export const createAttempt = async (attemptData: any) => {
  console.log("creating attempt", attemptData);
  const response = await axios.post(ATTEMPTS_API, attemptData);
  return response.data;
};

// Find all attempts
export const findAllAttempts = async () => {
  const response = await axios.get(ATTEMPTS_API);
  return response.data;
};

// Find attempt by ID
export const findAttemptById = async (attemptId: string) => {
  const response = await axios.get(`${ATTEMPTS_API}/${attemptId}`);
  return response.data;
};

// Update an attempt by ID
export const updateAttempt = async (attemptId: string, updatedData: any) => {
  console.log("attempt", updatedData)
  const response = await axios.put(`${ATTEMPTS_API}/${attemptId}`, updatedData);
  return response.data;
};

// Delete an attempt by ID
export const deleteAttempt = async (attemptId: string) => {
  const response = await axios.delete(`${ATTEMPTS_API}/${attemptId}`);
  return response.data;
};

export const getAttemptCount = async (userId: string, quizId: string): Promise<number> => {
  try {
    const response = await axios.get(`${ATTEMPTS_API}/count`, {
      params: { userId, quizId },
    });
    return response.data.count;
  } catch (error) {
    console.error("Error fetching attempt count:", error);
    throw error;
  }
};

export const getAttemptsByUserAndQuiz = async (userId: string, quizId: string): Promise<any[]> => {
  try {
    console.log(userId, quizId)
    const response = await axios.get('/api/quizzes/attempt/all', {
      params: { userId, quizId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attempts:", error);
    throw error;
  }
};

export const getMostRecentAttempt = async (userId: string, quizId: string): Promise<any> => {
  try {
      const response = await axios.get(`${ATTEMPTS_API}/recent`, {
          params: { userId, quizId },
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching the most recent attempt:", error);
      throw error;
  }
};

