import React from "react";
import styles from "../styles/Input.module.css";

function Input(props) {
  const {
    id,
    name,
    type,
    className,
    value,
    placeholder,
    register,
    error,
    autoFocus,
  } = props;
  let customClass;
  if (type === "checkbox" || type === "radio") {
    customClass = `${className} ${styles.in_check}`;
  } else {
    customClass = `${className} ${styles.in_cl}`;
  }
  if (error) {
    customClass = `${className} ${styles.in_cl} ${styles.error_cl}`;
    console.log(error);
  }
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className={customClass}
        onChange={onchange}
        {...register(name)}
        autoFocus={autoFocus}
      />
      {error ? <p className={styles.error_txt}>{error.message}</p> : null}
    </>
  );
}

export default Input;
