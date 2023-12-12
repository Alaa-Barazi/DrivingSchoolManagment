import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./StudentItem.module.css";
import NewLesson from "../NewLesson/NewLesson";
import DeleteStudent from "../DeleteStudent/DeleteStudent";
import NewPayment from "../NewPayment/NewPayment";

function StudentItem({ student}) {

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPay, setShowPay] = useState(false);
  return (
    <center>
      <div className={styles.container}>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="user"
            className={styles.profileImg}
          />
        </div>
        <div>
          <h3>{student.Name}</h3>
          <strong>{student.CarType}</strong>
          &nbsp; &nbsp;
          <strong>{student.NoLessons} Lessons</strong>
          <br />
          <p className="text-primary">{student.location}</p>
          <p className="text-muted">Payed: {student.TotalPayed} ₪</p>
        </div>

        <div className={styles.btnGroup}>
          <button
            className={styles.btnDelete}
            onClick={() => setShowDelete(true)}
          >
            &times;
          </button>
          <button className={styles.btnAdd} onClick={() => setShowAdd(true)}>
            &#10010;
          </button>
          <button className={styles.btnPay} onClick={() => setShowPay(true)}>
            &#36;
          </button>
          <Link className={styles.btnDetails} to={`${student.ID}`}>
            details
          </Link>
          &nbsp;
        </div>
      </div>

      {showAdd && (
        <NewLesson
          student={student}
          show={showAdd}
          setShow={setShowAdd}
          handleClose={setShowAdd}
        />
      )}

      {showDelete && (
        <DeleteStudent
          show={showDelete}
          setShow={setShowDelete}
          studentID={student.id}
        />
      )}
      {showPay && (
        <NewPayment
          ID={student.id}
          show={showPay}
          setShow={setShowPay}
        />
      )}
    </center>
  );
}

export default StudentItem;
