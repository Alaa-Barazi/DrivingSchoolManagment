import styles from "./TeacherProfile.module.css";
import { Link } from "react-router-dom";
function TeacherProfile({ teacher }) {
  return (
    <div className={styles.container} style={{ marginTop: "90px" }}>
      <div>
        <img
          src="https://i.imgur.com/bDLhJiP.jpg"
          width="100"
          class={styles.profileImg}
          alt="teacherimg"
        />
      </div>

      <div>
        <h5 className={styles.title}>Alexender Schidmt</h5>
        <p className={styles.description}>
          Experienced and patient driving instructor dedicated to helping
          learners develop safe and confident driving skills. With a passion for
          road safety and a comprehensive understanding of traffic regulations,
          I provide personalized instruction tailored to individual needs.
        </p>
        <center className={styles.totalStudents}>Total Students : X</center>

        <center>
          <Link className={styles.btn} to={`${teacher.id}`}>
            Edit Profile
          </Link>
        </center>
      </div>
    </div>
  );
}

export default TeacherProfile;
