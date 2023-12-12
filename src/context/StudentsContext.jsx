import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";
const BASE_URL = "http://localhost:9000";

const StudentsContext = createContext();
const initialState = {
  students: [],
  isLoading: false,
  error: "",
  numStudentsForUser: 0,
};
function reducer(state, action) {
  //load students, create new student, delete student, update student
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "students/loaded":
      return { ...state, isLoading: false, students: action.payload };
    case "setNumStudentsForUser":
      return { ...state, numStudentsForUser: action.payload };
    case "updateNumStudentsForUser":
      return {
        ...state,
        numStudentsForUser: state.numStudentsForUser + action.payload,
      };
    case "student/created":
      return {
        ...state,
        students: [...state.students, action.payload],
        isLoading: false,
      };
    case "student/updated":
      return {
        ...state,
        students: state.students.map((std) =>
          std.id === action.payload.id ? action.payload : std
        ),
        isLoading: false,
      };
    case "student/deleted":
      //pass ID as action payload
      return {
        ...state,
        students: state.students.filter((std) => std.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
}

function StudentsProvider({ children }) {
  const { user } = useAuth();
  const ID = user ? user.id : "";
  const [{ students, isLoading, error, numStudentsForUser }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchStudents() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(`${BASE_URL}/students?teacher=${ID}`);
          const data = await res.json();
          dispatch({ type: "students/loaded", payload: data });
          dispatch({ type: "setNumStudentsForUser", payload: data.length });
        } catch (err) {
          dispatch({
            type: "rejected",
            payload: "There was an error loading students...",
          });
        }
      }
      fetchStudents();
    },
    [ID]
  );

  async function getStudent(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding new student...",
      });
    }
  }
  async function createStudent(newStd) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        body: JSON.stringify(newStd),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "student/created", payload: data });
      dispatch({ type: "updateNumStudentsForUser", payload: 1 });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding new student...",
      });
    }
  }
  async function deleteStudent(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "student/deleted", payload: id });
      dispatch({ type: "updateNumStudentsForUser", payload: -1 });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting student...",
      });
    }
  }

  async function updateStudent(student) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/students/${student.id}`, {
        method: "PUT",
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "student/updated", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error updating student...",
      });
    }
  }

  //   body: JSON.stringify(newStd),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  return (
    <StudentsContext.Provider
      value={{
        students,
        isLoading,
        error,
        getStudent,
        createStudent,
        updateStudent,
        deleteStudent,
        dispatch,
        numStudentsForUser,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

function useStudents() {
  const context = useContext(StudentsContext);
  if (context === undefined)
    throw new Error("StudetnsContext was used outside the StudetnsProvider!!");
  return context;
}

export { StudentsProvider, useStudents };
