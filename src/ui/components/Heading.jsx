import React from "react";
import styles from "../styles/Heading.module.css";

function Heading({ title, className, size }) {
  const customClass = `${className} ${styles.heading_cl} ${styles[size]}`;

  return <p className={customClass}>{title}</p>;
}

export default Heading;
