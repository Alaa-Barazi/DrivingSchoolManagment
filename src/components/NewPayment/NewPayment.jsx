import { useNavigate } from "react-router-dom";
import styles from "./NewPayment.module.css";
import { useState } from "react";
function NewPayment({ ID, updatePay, show, setShow }) {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  function handleClose() {
    setShow(false);
    setAmount(0);
  }
  function handleModalClose() {
    setShow(false);
    if (amount !== 0) updatePay(ID, amount);
    setAmount(0);
    navigate("/Students");
  }
  function closeNavigate(e) {
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
              <div>
                  <label>Student ID</label>
                  <input
                    type="text"
                    placeholder="ID"
                    autoFocus
                    value={ID}
                    readOnly
                  />
                </div>
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

export default NewPayment;
