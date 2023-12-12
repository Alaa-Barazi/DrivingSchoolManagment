import { createContext, useContext, useReducer } from "react";
import { useTeachers } from "./TeachersContext";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: true };
    default:
      throw new Error("Unknown action");
  }
}
function AuthProvider({ children }) {
  const { teachers } = useTeachers();
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(id, password) {
    console.log(id, password);
    const teacher = teachers.find(
      (tch) => tch.id === id && tch.Password === password
    );
    console.log(teacher);
    if (teacher === undefined) return;
    else dispatch({ type: "login", payload: teacher });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
