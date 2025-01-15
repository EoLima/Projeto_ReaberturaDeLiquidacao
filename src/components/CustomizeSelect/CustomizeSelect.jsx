import Select from "react-select";
import styles from "./CustomizeSelect.module.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useField } from "@unform/core";

const CustomizeSelect = ({
  name,
  list,
  readOnly,
  label,
  isRequired,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => {
        return selectedOption ? selectedOption.value : "";
      },
      setValue: (_, newValue) => {
        const option = list.find((item) => item.value === newValue);
        setSelectedOption(option || null);
      },
      clearValue: () => {
        setSelectedOption(null);
      },
    });
  }, [fieldName, registerField, selectedOption, list]);

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
          ref={inputRef}
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
      </label>
    </div>
  );
};

export default CustomizeSelect;
