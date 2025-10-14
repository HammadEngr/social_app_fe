import React from "react";
import styles from "../styles/Button.module.css";

function Button({ type, size, className, onClick, children }) {
  const customClass = `${className} ${styles.btn_cl} ${styles[size]}`;
  return (
    <button className={customClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
