import React from "react";
import styles from "../styles/Hr.module.css";
function Hr({ className }) {
  const customClass = `${className} ${styles.hr_cl}`;
  return <hr className={customClass} />;
}

export default Hr;
