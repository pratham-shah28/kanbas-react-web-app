import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const getAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const enrollUser = async (enrollment: any) => {
  const { data } = await axios.post(ENROLLMENTS_API, enrollment);
  return data;
};

export const unenrollUser = async (enrollment: { user: string; course: string }) => {
  const { data } = await axios.delete(ENROLLMENTS_API, { data: enrollment });
  return data;
};

export const fetchEnrollments = async (userId: string) => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/users/${userId}`);
  return data;
};