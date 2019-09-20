import React from "react";
import { Info, DateTime } from "luxon";
import { BirthdateFields } from "./styles";

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

function birthDateReducer(state, action) {
  switch (action.type) {
    case "SET_DATE": {
      return { ...state, ...action.payload };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function initBirthdateFromObject(date) {
  if (!date) return {};
  return {
    "bday-year": date.year,
    "bday-month": date.month,
    "bday-day": date.day
  };
}

function Birthdate({
  name,
  initialValue,
  setFieldValue,
  format,
  error,
  setFieldError,
  errorMsg,
  showErrorMsg = true,
  naked,
  minAge,
  maxAge
}) {
  const [state, dispatch] = React.useReducer(
    birthDateReducer,
    initBirthdateFromObject(initialValue)
  );
  const handleChange = event => {
    event.persist();
    dispatch({
      type: "SET_DATE",
      payload: { [event.target.name]: event.target.value }
    });
  };

  React.useEffect(() => {
    const now = DateTime.local();
    const maxDatetime = minAge ? now.minus({ year: minAge }) : now;
    const minDatetime = maxAge
      ? now.minus({ year: maxAge })
      : now.minus({ year: 100 });
    const { "bday-year": year, "bday-month": month, "bday-day": day } = state;
    if (
      !year ||
      !month ||
      !day ||
      year === "" ||
      month === "" ||
      day === "" ||
      year.length < 4
    )
      return;

    const dateTime = DateTime.local(Number(year), Number(month), Number(day));
    if (!dateTime.isValid || dateTime > maxDatetime || dateTime < minDatetime) {
      return setFieldError(name, errorMsg ? errorMsg : "Date invalid");
    }
    setFieldValue(name, dateTime.toFormat(format));
  }, [
    setFieldError,
    setFieldValue,
    name,
    format,
    state,
    errorMsg,
    maxAge,
    minAge
  ]);

  const now = DateTime.local();
  const maxDatetime = minAge ? now.minus({ year: minAge }) : now;
  const minDatetime = maxAge
    ? now.minus({ year: maxAge })
    : now.minus({ year: 100 });

  return (
    <>
      <BirthdateFields naked={naked} error={error}>
        <MonthsSelect handleChange={handleChange} state={state} />
        <DayInput handleChange={handleChange} state={state} />
        <YearInput
          max={maxDatetime.year}
          min={minDatetime.year}
          handleChange={handleChange}
          state={state}
        />
        {error && showErrorMsg && <small>{error}</small>}
      </BirthdateFields>
      <code>
        <pre>{JSON.stringify(state)}</pre>
      </code>
    </>
  );
}

export default Birthdate;
