import { useReducer } from "react";
import styles from "./EditProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTeachers } from "../../context/TeachersContext";
import { useAuth } from "../../context/AuthContext";
const teacher = {
  ID: "",
  Name: "",
  Password: "",
  PhoneNumber: "",
  Description: "",
  Img: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, Name: action.payload };
    case "setPassword":
      return { ...state, Password: action.payload };
    case "setPhoneNumber":
      return { ...state, PhoneNumber: action.payload };
    case "setDescription":
      return { ...state, Description: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
function EditProfile() {
  const { user, updateUser } = useAuth();
  const [{ id, Name, Password, PhoneNumber, Description, Img }, dispatch] =
    useReducer(reducer, user);

  const navigate = useNavigate();
  const { updateTeacher } = useTeachers();
  function handleTeacherUpdate() {
    const teacher = {
      id,
      Name,
      Password,
      PhoneNumber,
      Description,
      Img,
    };
    updateTeacher(teacher);
    updateUser(teacher);
    //teachers context
    console.log(teacher);
    navigate("/Profile");
  }
  return (
    <div className={styles.container} style={{ marginTop: "70px" }}>
      <div>
        <center>
          <h3 className={styles.title}>Your Details</h3>
        </center>
        <div>
          <span>
            <i>ID</i>
          </span>
          <input type="text" value={id} readOnly />
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
          />
          &nbsp;
          <span>
            <i>Password:</i>
          </span>
          <input
            type="text"
            value={Password}
            onChange={(e) =>
              dispatch({ type: "setName", payload: e.target.value })
            }
          />
        </div>
        <div>
          <span>
            <i>Phone Number</i>
          </span>
          <input
            type="text"
            value={PhoneNumber}
            onChange={(e) =>
              dispatch({ type: "setPhoneNumber", payload: e.target.value })
            }
          />
          &nbsp;
          <span>
            <i>Description</i>
          </span>
          <input
            type="text"
            value={Description}
            onChange={(e) =>
              dispatch({ type: "setDescription", payload: e.target.value })
            }
          />
        </div>

        <div>
          <button className={styles.btn} onClick={() => navigate(-1)}>
            &larr; Back
          </button>
          &nbsp;
          <button className={styles.btn} onClick={handleTeacherUpdate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
