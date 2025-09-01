import React from "react";
import styles from "../styles/Input.module.css";

function Input({
  type = "text",
  id,
  name,
  className,
  placeholder,
  required,
  onChange,
}) {
  let customClass;
  if (type === "checkbox" || type === "radio") {
    customClass = `${className} ${styles.in_check}`;
  } else {
    customClass = `${className} ${styles.in_cl}`;
  }
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={customClass}
      onChange={onchange}
      required={required}
    />
  );
}

export default Input;
