import { useStudents } from "../../context/StudentsContext";
import styles from "./NewLesson.module.css";
import { useState } from "react";
function NewLesson({ student, show, setShow, handleClose }) {
  const { updateStudent } = useStudents();
  const [lesson, setLesson] = useState(1);
  function handleModalClose() {
    handleClose(false);
    const UpdatedDtd = {
      ...student,
      NoLessons: student.NoLessons + lesson,
    };
    updateStudent(UpdatedDtd);
  }
  return (
    <div className={`container ${show ? "" : "hidden"}`}>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div
              className={styles.titleCloseBtn}
              onClick={() => setShow(false)}
            >
              <button>X</button>
            </div>
            <div className={styles.Mtitle}>
              <h1>Add Lessons</h1>
            </div>

            <div className={styles.Mbody}>
              <form>
                <div>
                  <label>Student ID</label>
                  <input
                    type="text"
                    placeholder="ID"
                    autoFocus
                    value={student.ID}
                    readOnly
                  />
                </div>

                <label>Lessons: </label>
                <select
                  value={lesson}
                  onChange={(e) => setLesson(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={1.5}>1.5</option>
                  <option value={2}>2</option>
                  <option value={2.5}>2.5</option>
                  <option value={2.5}>3</option>
                </select>
              </form>
            </div>
            <div className={styles.Mfooter}>
              <button
                onClick={() => setShow(false)}
                style={{ backgroundColor: "cornflowerblue" }}
              >
                Close
              </button>
              <button onClick={handleModalClose}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewLesson;
