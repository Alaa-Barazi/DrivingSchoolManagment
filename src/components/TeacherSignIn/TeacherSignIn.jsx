import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TeacherSignIn.module.css";
import { useAuth } from "../../context/AuthContext";
const initialState = {
  id: "",
  password: "",
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setID":
      return { ...state, id: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown type");
  }
}
function TeacherSignIn() {
  const [{ id, password, error }, dispatch] = useReducer(reducer, initialState);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleSubmit() {
    //check if the user exists
    login(id, password);
    // dispatch({ type: "reset" });
    // navigate("/Students");
  }
  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/Students", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <div className={styles.container} style={{ marginTop: "70px" }}>
      <form>
        <center>
          <h2 className={styles.title}>Sign In</h2>{" "}
        </center>
        <div>
          <label> ID </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "setID", payload: e.target.value })
            }
            value={id}
          />
        </div>

        <div>
          <label> Password </label>
          <input
            type="password"
            onChange={(e) =>
              dispatch({
                type: "setPassword",
                payload: e.target.value,
              })
            }
            value={password}
          />
        </div>

        <span className="text-danger">{error}</span>
        <center>
          <button type="button" className={styles.btn} onClick={handleSubmit}>
            Sign in
          </button>
        </center>

        <div>
          <p>
            Don't have an account? <Link to="/Register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default TeacherSignIn;
