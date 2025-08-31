import React from "react";
import styles from "../styles/Label.module.css";

function Label({ htmlFor, children, className }) {
  const customClass = `${className} ${styles.label_cl}`;
  return (
    <label className={customClass} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
