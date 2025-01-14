import styles from "./CustomizeInput.module.css";

const CustomizeInput = ({
  type,
  name,
  label,
  readOnly,
  isRequired,
  placeholder,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.container_label}>
        <span className={styles.title}>{label}</span>
        <input
          className={styles.input}
          placeholder={placeholder}
          type={type}
          name={name}
          required={isRequired}
          readOnly={readOnly}
        />
      </label>
    </div>
  );
};

export default CustomizeInput;
