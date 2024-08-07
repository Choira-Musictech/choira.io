import React from "react";
import style from "../studios/studio.module.css";

function CustomSelect({
  name,
  value,
  onChange,
  id,
  htmlFor,
  label,
  options,
  defaultOption,
  error,
  touched,
  disabled,
}) {
  return (
    <div className={style.customInput}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        className={disabled ? style.disabled : ""}
        // defaultValue={defaultOption}
      >
        <option value={defaultOption} hidden>
          {defaultOption}
        </option>
        <option value={""} disabled>
          {defaultOption}
        </option>
        {Array.isArray(options)
          ? options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          : Object.keys(options).map((key, index) => (
              <option key={index} value={options[key]}>
                {key}
              </option>
            ))}
      </select>
      {error && touched ? <p className={style.error}>{error}</p> : null}
    </div>
  );
}

export default CustomSelect;
