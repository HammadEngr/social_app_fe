import React from "react";
import styles from "../styles/FormWrapper.module.css";

function FormWrapper({ children, className }) {
  const customClass = `${className} ${styles.wrap}`;
  return <div className={customClass}>{children}</div>;
}

export default FormWrapper;
