import { useAuth } from "../../context/AuthContext";
import { useStudents } from "../../context/StudentsContext";
import styles from "./TeacherProfile.module.css";
import { Link } from "react-router-dom";
function TeacherProfile({ teacher }) {
  const { user } = useAuth();
  const { numStudentsForUser: numStd } = useStudents();

  return (
    <div className={styles.container} style={{ marginTop: "90px" }}>
      <div>
        <img
          src={user.Img}
          width="100"
          className={styles.profileImg}
          alt="teacherimg"
        />
      </div>

      <div>
        <h5 className={styles.title}>{user.Name}</h5>
        <p className={styles.description}>{user.Description}</p>
        <center className={styles.totalStudents}>
          Total Students : {numStd}
        </center>

        <center>
          <Link className={styles.btn} to={`${user.id}`}>
            Edit Profile
          </Link>
        </center>
      </div>
    </div>
  );
}

export default TeacherProfile;
