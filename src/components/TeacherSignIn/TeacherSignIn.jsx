import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./TeacherSignIn.module.css";
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
    case 'reset':
      return initialState;
    default:
      throw new Error("Unknown type");
  }
}
function TeacherSignIn() {
  const [{ id, password, error }, dispatch] = useReducer(reducer, initialState);
  const navigate=useNavigate();
  function handleSubmit() {
    //check if the user exists
    dispatch({type:"reset"});
    navigate ('/Students');

  }
  return (
   
    <div
      className={styles.container}
      style={{ marginTop: "70px" }}
    >
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
          <button type="button" onClick={handleSubmit} className={styles.btn}>
            Sign in
          </button>
        </center>

        <div>
          <p>
            Don't have an account? <Link to='/Register'>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
   
  );
}

export default TeacherSignIn;
