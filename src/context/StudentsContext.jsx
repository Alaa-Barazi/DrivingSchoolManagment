import { createContext, useContext, useEffect, useReducer } from "react";
const BASE_URL = "http://localhost:9000";

const StudentsContext = createContext();
const initialState = {
  students: [],
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  //load students, create new student, delete student, update student
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "students/loaded":
      return { ...state, isLoading: false, students: action.payload };
    case "student/created":
      return {
        ...state,
        students: [...state.students, action.payload],
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
  const [{ students, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchStudents() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/students`);
        const data = await res.json();
        dispatch({ type: "students/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading studetns...",
        });
      }
    }
    fetchStudents();
  }, []);

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
      await fetch(`${BASE_URL}/students/${student.ID}`, {
        method: "PUT",
        body: JSON.stringify(student),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
