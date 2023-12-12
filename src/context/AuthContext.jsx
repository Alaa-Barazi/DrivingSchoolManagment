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
      return { ...state, user: null, isAuthenticated: false };
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
    const teacher = teachers.find(
      (tch) => tch.id === id && tch.Password === password
    );
    if (teacher === undefined) return;
    else dispatch({ type: "login", payload: teacher });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  function updateUser(newUser) {
    dispatch({ type: "login", payload: newUser });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser
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
