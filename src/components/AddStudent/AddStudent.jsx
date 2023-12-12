import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddStudent.module.css";
import { useStudents } from "../../context/StudentsContext";
const initialState = {
  id: "",
  name: "",
  lessons: 0,
  startDate: "",
  bDate: "",
  location: "",
  carType: "manual",
  phoneNumber: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setId":
      return { ...state, id: action.payload };
    case "setName":
      return { ...state, name: action.payload };
    case "setLessons":
      return { ...state, lessons: action.payload };
    case "setStartDate":
      return { ...state, startDate: action.payload };
    case "setBDate":
      return { ...state, bDate: action.payload };
    case "setLocation":
      return { ...state, location: action.payload };
    case "setCarType":
      return { ...state, carType: action.payload };
    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload };
    default:
      throw new Error("Unknown Action!!");
  }
}
function AddStudent({ onAdd }) {
  const { createStudent } = useStudents();
  const [
    { id, name, lessons, startDate, bDate, location, carType, phoneNumber },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const newStd = {
      id,
      Name: name,
      StartDate: startDate,
      BDate: bDate,
      NoLessons: Number(lessons),
      location,
      CarType: carType,
      TotalPayed: 0,
      teacher: "teacherId",
    };
    createStudent(newStd);
    navigate("/Students");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container} style={{ marginTop: "70px" }}>
        <div>
          <center>
            <h3 className={styles.title}>New Student </h3>
          </center>
          <div>
            <span>
              <i>ID</i>
            </span>
            <input
              type="text"
              value={id}
              onChange={(e) =>
                dispatch({ type: "setId", payload: e.target.value })
              }
              required
            />
          </div>{" "}
          <div>
            <span>
              <i>Name</i>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) =>
                dispatch({ type: "setName", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i>Start Date</i>
            </span>
            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                dispatch({
                  type: "setStartDate",
                  payload: e.target.value,
                })
              }
              required
            />

            <span>
              <i>No. lessons</i>
            </span>
            <input
              type="number"
              value={lessons}
              onChange={(e) =>
                dispatch({ type: "setLessons", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i> B.Date</i>
            </span>
            <input
              type="date"
              value={bDate}
              onChange={(e) =>
                dispatch({ type: "setBDate", payload: e.target.value })
              }
              required
            />

            <span>
              <i>Location</i>
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) =>
                dispatch({ type: "setLocation", payload: e.target.value })
              }
              required
            />
          </div>
          <div>
            <span>
              <i>Car Type</i>
            </span>
            <select
              value={carType}
              onChange={(e) =>
                dispatch({ type: "setCarType", payload: e.target.value })
              }
              required
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>

            <span>
              <i>Phone number</i>
            </span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) =>
                dispatch({
                  type: "setPhoneNumber",
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <button className={styles.btn}> &larr; Back</button>
            &nbsp;
            <button className={styles.btn}>Add</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddStudent;
