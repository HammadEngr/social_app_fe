import styles from "./Header.module.css";
import { useTheme } from "../../contexts/ThemeContext";

function Header() {
  const { toggleTheme } = useTheme();
  return (
    <div className={styles.h_box}>
      <p>Listening Practice</p>
      <button className={styles.btn} onClick={toggleTheme}>
        dark / light
      </button>
    </div>
  );
}

export default Header;
