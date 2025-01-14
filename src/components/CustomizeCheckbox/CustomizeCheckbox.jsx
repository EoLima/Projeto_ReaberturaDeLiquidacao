import styles from "./CustomizeCheckbox.module.css";
import { useEffect, useState } from "react";

const CustomizeCheckbox = ({
  name,
  list,
  label,
  readOnly,
  isRequired,
  allowMultiple,
  defaultValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (e) => {
    let value = Number(e.target.value);
    let checked = e.target.checked;

    if (allowMultiple) {
      setSelectedOptions((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    } else {
      setSelectedOptions(checked ? [value] : []);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      if (allowMultiple) {
        setSelectedOptions(
          Array.isArray(defaultValue)
            ? defaultValue.map((v) => v.value)
            : [defaultValue.value]
        );
      } else {
        setSelectedOptions([defaultValue.value]);
      }
    }
  }, [defaultValue, allowMultiple]);

  return (
    <div className={styles.container}>
      <label className={styles.container_label}>
        <span className={styles.title}>{label}</span>
        <div className={styles.container_input}>
          {list.map((details) => (
            <div key={details.id}>
              <input
                name={name}
                disabled={readOnly}
                required={isRequired}
                className={styles.input}
                type="checkbox"
                id={details.name}
                value={details.value}
                onChange={handleCheckboxChange}
                checked={selectedOptions.includes(details.value)}
              />
              <label className={styles.input_title} htmlFor={details.name}>
                {details.name}
              </label>
            </div>
          ))}
          {readOnly &&
            selectedOptions.map((value) => (
              <input key={value} type="hidden" name={name} value={value} />
            ))}
        </div>
      </label>
    </div>
  );
};

export default CustomizeCheckbox;
