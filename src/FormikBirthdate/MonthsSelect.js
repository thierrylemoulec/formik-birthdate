import React from "react";
import { Info } from "luxon";

const MonthsSelect = ({ handleChange, state }) => {
  const months = Info.months();
  const name = "bday-month";
  const value = state[name] || "default";
  return (
    <select
      data-testid="bday-month"
      onChange={handleChange}
      value={value}
      name="bday-month"
    >
      <option value="default" disabled>
        Months
      </option>
      {months.map((m, i) => {
        return (
          <option value={i + 1} key={`month-${m.toLowerCase()}`}>
            {m}
          </option>
        );
      })}
    </select>
  );
};

export default MonthsSelect;
