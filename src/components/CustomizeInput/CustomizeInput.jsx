import { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styles from "./CustomizeInput.module.css";

const CustomizeInput = ({
  type,
  name,
  label,
  readOnly,
  isRequired,
  placeholder,
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.container}>
      <label className={styles.container_label}>
        <span className={styles.title}>{label}</span>
        <input
          className={styles.input}
          placeholder={placeholder}
          type={type}
          ref={inputRef}
          name={name}
          required={isRequired}
          readOnly={readOnly}
        />
      </label>
    </div>
  );
};

export default CustomizeInput;
