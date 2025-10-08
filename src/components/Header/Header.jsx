import { Tooltip } from "antd";
import { House, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import User from "../User/User";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header_cl}>
      <div className={styles.left}>Left</div>
      <div className={styles.mid}>
        <Tooltip title="Home" arrow={false}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.isActive} ${styles.nav_link}`
                : styles.nav_link
            }
          >
            <House size={28} strokeWidth={3} className={styles.icon_cl} />
          </NavLink>
        </Tooltip>
        <Tooltip title="Friends" arrow={false}>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive
                ? `${styles.isActive} ${styles.nav_link}`
                : styles.nav_link
            }
          >
            <Users size={28} strokeWidth={3} className={styles.icon_cl} />
          </NavLink>
        </Tooltip>
      </div>

      <div className={styles.right}>
        <User />
      </div>
    </div>
  );
}

export default Header;
