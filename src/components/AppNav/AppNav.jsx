import { useAuth } from "../../context/AuthContext";
import Logo from "../Logo/Logo";
import User from "../User/User";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/Students">My students</NavLink>
            </li>
            <li>
              <NavLink to="/AddStudent">Add student</NavLink>
            </li>
            <li>
              <NavLink to="/Profile">My Profile</NavLink>
            </li>
            <User /> <br />
          </>
        ) : (
          <li>
            <NavLink to="/Login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default AppNav;
