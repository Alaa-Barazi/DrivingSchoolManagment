import { useReducer } from "react";
import styles from "./TeacherRegister.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTeachers } from "../../context/TeachersContext";
const initialState = {
  ID: "",
  Name: "",
  Password: "",
  PhoneNumber: "",
  Description: "",
  Img: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setID":
      return { ...state, ID: action.payload };
    case "setName":
      return { ...state, Name: action.payload };
    case "setPassword":
      return { ...state, Password: action.payload };
    case "setPhoneNumber":
      return { ...state, PhoneNumber: action.payload };
    case "setDescription":
      return { ...state, Description: action.payload };
    case "setImg":
      return { ...state, Img: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
function TeacherRegister() {
  const [{ ID, Name, Password, PhoneNumber, Description, Img }, dispatch] =
    useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { createTeacher, isLoading } = useTeachers();
  function handleSubmit(e) {
    e.preventDefault();
    const newTeacher = {
      id: ID,
      Name,
      Password,
      PhoneNumber,
      Description,
      Img,
    };
    createTeacher(newTeacher);
    dispatch({ type: "reset" });
    navigate("/Login");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container} style={{ marginTop: "70px" }}>
        <div>
          <center>
            <h3 className={styles.title}>Register </h3>
          </center>
          <div>
            <span>
              <i>ID</i>
            </span>
            <input
              type="text"
              value={ID}
              onChange={(e) =>
                dispatch({ type: "setID", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i>Name</i>
            </span>
            <input
              type="text"
              value={Name}
              onChange={(e) =>
                dispatch({ type: "setName", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i>Password</i>
            </span>
            <input
              type="password"
              value={Password}
              onChange={(e) =>
                dispatch({
                  type: "setPassword",
                  payload: e.target.value,
                })
              }
              required
            />

            <span>
              <i>PhoneNumber</i>
            </span>
            <input
              type="text"
              value={PhoneNumber}
              onChange={(e) =>
                dispatch({ type: "setPhoneNumber", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i> Description</i>
            </span>
            <textarea
              value={Description}
              onChange={(e) =>
                dispatch({ type: "setDescription", payload: e.target.value })
              }
              required
            ></textarea>

            <span>
              <i>Load an Img</i>
            </span>
            <input
              type="file"
              value={Img}
              onChange={(e) =>
                dispatch({ type: "setImg", payload: e.target.value })
              }
              required
            />
          </div>

          <center>
            <button className={styles.btn}>Sign Up</button>
            &nbsp; &nbsp;
            <div>
              have an account?
              <Link to="/Login"> Sign in</Link>
            </div>
          </center>
        </div>
      </div>
    </form>
  );
}

export default TeacherRegister;
