import { useState } from "react";
import styles from "./StudentDetails.module.css";
import Button from "../Button/Button";
import { Outlet, useNavigate, useParams } from "react-router-dom";
function StudentDetails({ student }) {
  const navigate = useNavigate();
  const { id } = useParams();
  //student should use find methos on the array (or create method to fins student by id in the context api)
  const {
    ID,
    Name,
    StartDate,
    BDate,
    NoLessons,
    location,
    CarType,
    TotalPayed,
    teacher,
  } = student;
  const [carType, setCar] = useState(CarType);
  const [locn, setLocation] = useState(location);
  //handleUpdate in the students component or the app
  function handleStudentUpdate() {
    if (carType !== CarType || locn !== location) {
      const std = {
        ID,
        Name,
        StartDate,
        BDate,
        NoLessons,
        location,
        CarType: carType,
        TotalPayed,
        teacher,
      };
    }
    navigate("/Students");
  }
  return (
    <div className={styles.container} style={{ marginTop: "70px" }}>
      <div>
        <center>
          <h3 className={styles.title}>Student Details</h3>
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
          <input type="text" readOnly value={Name} />
          &nbsp;
          <span>
            <i>Start Date:</i>
          </span>
          <input type="text" readOnly value={StartDate} />
        </div>
        <div>
          <span>
            <i>No. lessons</i>
          </span>
          <input type="text" readOnly value={NoLessons} />
          &nbsp;
          <span>
            <i> B.Date:</i>
          </span>
          <input type="text" readOnly value={BDate} />
        </div>
        <div>
          <span>
            <i>Location</i>
          </span>
          <input
            type="text"
            value={locn}
            onChange={(e) => setLocation(e.target.value)}
          />
          &nbsp;
          <span>
            <i> Car Type</i>
          </span>
          <select
            className="form-control text-danger font-weight-bold"
            value={carType}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="Manual" className="font-weight-bold">
              Manual
            </option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <Button className={styles.btn} action={() => navigate(-1)}>
            &larr; Back
          </Button>
          &nbsp;
          <Button className={styles.btn} action={handleStudentUpdate}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
export default StudentDetails;
