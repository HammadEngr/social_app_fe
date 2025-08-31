import styles from "../styles/Form.module.css";
function Form({ children, className }) {
  const customClass = `${className} ${styles.form_cl}`;
  return <form className={customClass}>{children}</form>;
}

export default Form;
