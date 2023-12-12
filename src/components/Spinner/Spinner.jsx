import styles from "./Spinner.module.css";
function Spinner() {
  return (
    <div className={styles.loadercontainer}>
      <div className={styles.loader}></div>
      <p>Loading students...</p>
    </div>
  );
}

export default Spinner;
