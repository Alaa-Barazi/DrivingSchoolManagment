import { createContext, useContext, useEffect, useReducer } from "react";

const TeachersContext = createContext();
const initialState = {
  teachers: "",
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "teachers/loaded":
      return { ...state, isLoading: false, teachers: action.payload };
    case "teacher/created":
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
        isLoading: false,
      };
    case "teachers/deleted":
      //pass ID as action payload
      return {
        ...state,
        teachers: state.teachers.filter((tch) => tch.id !== action.payload),
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
}
const BASE_URL = "http://localhost:9000";
function TeachersProvider({ children }) {
  const [{ teachers, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchTeachers() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/teachers`);
        const data = await res.json();
        dispatch({ type: "teachers/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading teachers...",
        });
      }
    }
    fetchTeachers();
  }, []);
  async function getTeacher(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/teachers/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error getting teacher/user...",
      });
    }
  }

  async function createTeacher(teacher) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/teachers`, {
        method: "POST",
        body: JSON.stringify(teacher),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "teacher/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding new teacher...",
      });
    }
  }

  return (
    <TeachersContext.Provider
      value={{
        teachers,
        isLoading,
        error,
        getTeacher,
        createTeacher
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
}

function useTeachers() {
  const context = useContext(TeachersContext);
  if (context === undefined)
    throw new Error("TeacherContext was used outside the TheachersProvider");
  return context;
}

export { TeachersProvider, useTeachers };
