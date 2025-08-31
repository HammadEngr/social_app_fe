import React from "react";
import styles from "../styles/Button.module.css";

function Button({ title, type, size, className, onClick }) {
  const customClass = `${className} ${styles.btn_cl} ${styles[size]}`;
  return (
    <button className={customClass} type={type} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
