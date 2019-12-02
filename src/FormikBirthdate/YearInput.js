import React from "react";

const YearInput = ({ handleChange, state, min, max }) => {
  const name = "bday-year";
  const value = state[name];
  return (
    <input
      data-testid="bday-year"
      disabled={!state["bday-month"] || state["bday-month"] === ""}
      onChange={handleChange}
      name="bday-year"
      autoComplete="bday-year"
      placeholder="Year"
      type="number"
      step="1"
      min={min}
      defaultValue={value}
      max={max}
      pattern="\d*"
    />
  );
};

export default YearInput;
