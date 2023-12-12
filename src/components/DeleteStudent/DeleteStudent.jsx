//import "bootstrap/dist/css/bootstrap.css";
import { useStudents } from "../../context/StudentsContext";
import styles from "./DeleteStudent.module.css";

function DeleteStudent({ show, setShow, studentID }) {
  const { deleteStudent } = useStudents();
  function handleClose() {
    setShow(false);
  }
  async function handleRemove() {
    // setShow(false);
    //  await getStudent(studentID);
    await deleteStudent(studentID);
  }
  return (
    <div className={`container ${show ? "" : "hidden"}`} onClick={handleClose}>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.titleCloseBtn} onClick={handleClose}>
              <button>X</button>
            </div>
            <div className={styles.Mtitle}>
              <h1>Remove Student Permanently?</h1>
            </div>

            <div className={styles.Mbody}>
              <p>Are you sure you want to remove this student?</p>
            </div>
            <div className={styles.Mfooter}>
              <button
                onClick={handleClose}
                style={{ backgroundColor: "cornflowerblue" }}
              >
                Close
              </button>
              <button onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteStudent;
