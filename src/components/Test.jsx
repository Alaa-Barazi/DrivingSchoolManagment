import { useNavigate } from "react-router-dom";
import styles from "./Test.module.css";
import { useState } from "react";

function Test({ students, updatePay, show, setShow }) {
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(students.length > 0 ? students[0].ID : "");
  const navigate = useNavigate();
  function handleClose() {
    setShow(false);
    setAmount(0);
    setId("");
  }
  function handleModalClose() {
    setShow(false);
    if (amount !== 0) updatePay(id, amount);
    setAmount(0);
    setId("");
    navigate("/Students");
  }
  function closeNavigate() {
    setShow(false);
    navigate("/Students");
  }
  return (
    <div className={`container ${show ? "" : "hidden"}`}>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.modalContainer}>
            <div className={styles.titleCloseBtn} onClick={closeNavigate}>
              <button>X</button>
            </div>
            <div className={styles.Mtitle}>
              <h1>Add Payment</h1>
            </div>

            <div className={styles.Mbody}>
              <form>
                <label>Students: </label>
                <select value={id} onChange={(e) => setId(e.target.value)}>
                  {students.map((student) => (
                    <option value={student.ID} key={student.ID}>
                      {student.Name}
                    </option>
                  ))}
                </select>
                <div>
                  <label>Payment Amount: </label>
                  <input
                    type="text"
                    autoFocus
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className={styles.Mfooter}>
              <button
                onClick={closeNavigate}
                style={{ backgroundColor: "cornflowerblue" }}
              >
                Close
              </button>
              <button onClick={handleModalClose}>Add Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
