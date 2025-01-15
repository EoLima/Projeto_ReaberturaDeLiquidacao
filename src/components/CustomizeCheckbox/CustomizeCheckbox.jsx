import { useField } from "@unform/core";
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
  const [selectedOptions, setSelectedOptions] = useState([defaultValue.value]);
  const { fieldName, registerField } = useField(name);

  const handleCheckboxChange = (e) => {
    let value = Number(e.target.value);
    let checked = e.target.checked;

    if (allowMultiple) {
      setSelectedOptions((prev) =>
        checked
          ? [...prev, value]
          : prev.filter((selected) => selected !== value)
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

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return allowMultiple ? selectedOptions : selectedOptions[0] || null;
      },
      setValue: (_, newValue) => {
        setSelectedOptions(
          allowMultiple
            ? Array.isArray(newValue)
              ? newValue
              : [newValue]
            : [newValue]
        );
      },
      clearValue: () => setSelectedOptions([]),
    });
  }, [fieldName, registerField, selectedOptions, allowMultiple]);

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
                id={`${name}-${details.value}`}
                value={details.value}
                onChange={handleCheckboxChange}
                checked={selectedOptions.includes(details.value)}
              />
              <label
                className={styles.input_title}
                htmlFor={`${name}-${details.value}`}
              >
                {details.name}
              </label>
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};

export default CustomizeCheckbox;
