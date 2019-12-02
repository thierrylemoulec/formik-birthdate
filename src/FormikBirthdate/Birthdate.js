import React from "react";
import { DateTime } from "luxon";
import { BirthdateFields } from "./styles";
import MonthsSelect from "./MonthsSelect";
import DayInput from "./DayInput";
import YearInput from "./YearInput";

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
