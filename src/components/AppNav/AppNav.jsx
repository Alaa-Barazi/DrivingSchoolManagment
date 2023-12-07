import Logo from "../Logo/Logo";
import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
      <li>
          <NavLink to="/Students">My students</NavLink>
        </li>
        <li>
          <NavLink to="/AddStudent">Add student</NavLink>
        </li>
        <li>
        <NavLink to="/Profile" >
        My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/Login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
