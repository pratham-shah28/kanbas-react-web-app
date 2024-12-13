import { useSelector } from "react-redux";


export default function AdminRestricted({ children}: { children: any}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role === "ADMIN") {
    return children;
  } else {
    return <></>
}}

export function FacultyRestricted({ children}: { children: any}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role === "FACULTY") {
    return children;
  } else {
    return <></>
}}

export function StudentRestricted({ children}: { children: any}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role === "STUDENT") {
    return children;
  } else {
    return <></>
}}

export function FacultyAndAdminRestricted({ children}: { children: any}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role === "ADMIN" || currentUser.role === "FACULTY") {
    return children;
  } else {
    return <></>
}}