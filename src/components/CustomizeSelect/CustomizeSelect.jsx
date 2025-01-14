import Select from "react-select";
import styles from "./CustomizeSelect.module.css";
import { useState } from "react";
import { useEffect } from "react";

const CustomizeSelect = ({
  name,
  list,
  readOnly,
  label,
  isRequired,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <div className={styles.container}>
      <label className={styles.container_label}>
        <span className={styles.label_title}>{label}</span>
        <Select
          placeholder=""
          isDisabled={readOnly}
          isClearable={true}
          required={isRequired}
          value={selectedOption}
          className={styles.label_select}
          name={name}
          onChange={handleChange}
          defaultValue={defaultValue ? defaultValue : null}
          options={list}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#b196d0",
              primary25: "#e6d4fb",
            },
          })}
        ></Select>
        {readOnly && (
          <input
            type="hidden"
            name={name}
            value={selectedOption ? selectedOption.value : ""}
          />
        )}
      </label>
    </div>
  );
};

export default CustomizeSelect;
