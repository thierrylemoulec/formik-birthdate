import React from "react";

const DayInput = ({ handleChange, state, max = 31 }) => {
  const name = "bday-day";
  const value = state[name];
  return (
    <input
      data-testid="bday-day"
      disabled={!state["bday-month"] || state["bday-month"] === ""}
      name="bday-day"
      placeholder="Day"
      type="number"
      step="1"
      min="1"
      max={max}
      pattern="\d*"
      onChange={handleChange}
      defaultValue={value}
    />
  );
};

export default DayInput;
