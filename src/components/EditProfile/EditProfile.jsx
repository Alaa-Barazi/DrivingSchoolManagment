import { useReducer } from "react";
import styles from "./EditProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
const teacher = {
  ID: "123456",
  Name: "knkbnl",
  Password: "Admin",
  PhoneNumber: "0504337676",
  Description: "...",
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
  // ID: "123456",
  // Name: "knkbnl",
  // Password: "Admin",
  // PhoneNumber: "0504337676",
  // Description: "..."
  //maybe it will receive later and id int the url instead of the teacher itself
  //should pass id not teacher object!!!
  //const { id } = useParams();

  const [{ ID, Name, Password, PhoneNumber, Description, Img }, dispatch] =
    useReducer(reducer, teacher);
  const navigate = useNavigate();
  function handleStudentUpdate() {
    const teacher = {
      ID,
      Name,
      Password,
      PhoneNumber,
      Description,
      Img,
    };

    console.log(teacher);
    navigate("/");
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
          <input type="text" value={ID} readOnly />
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
          <button className={styles.btn} onClick={handleStudentUpdate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
