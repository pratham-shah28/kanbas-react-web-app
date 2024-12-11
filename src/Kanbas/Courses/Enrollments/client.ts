import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });


export const getAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};

export const enrollUser = async (enrollment: any) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, enrollment);
  return data;
};

export const unenrollUser = async (enrollment: { user: string; course: string }) => {
  const { data } = await axiosWithCredentials.delete(ENROLLMENTS_API, { data: enrollment });
  return data;
};

export const fetchEnrollments = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/users/${userId}`);
  return data;
};