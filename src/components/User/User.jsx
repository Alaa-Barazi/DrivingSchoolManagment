import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.Img} alt={user.Name} />
      <span>Welcome, {user.Name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
