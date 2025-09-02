import styles from "../styles/Form.module.css";
function Form({ children, className, onSubmit }) {
  const customClass = `${className} ${styles.form_cl}`;
  return (
    <form className={customClass} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
