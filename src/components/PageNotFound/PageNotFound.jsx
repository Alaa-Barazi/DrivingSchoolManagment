import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
function PageNotFound() {
  return (
    <center className={styles.container}>
      {/* <h1>Page not found 😢</h1> */}
      <img
        src="https://lh5.ggpht.com/-BT2vrN7opxY/T29IOqvfO8I/AAAAAAAAGJQ/_UUXI7_-n7g/image%25255B10%25255D.png?imgmax=800"
        alt="pageNotFound"
      />
 
 <br/> <br/> <br/>
      <Link to='/' className={styles.btn}> Back Home <span>&nbsp;😢</span></Link>
    </center>
  );
}

export default PageNotFound;
