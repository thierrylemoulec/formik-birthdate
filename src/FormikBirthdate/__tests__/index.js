import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { Form, Formik } from "formik";
import FormikBirthdate from "../index";
import { DateTime } from "luxon";

afterEach(cleanup);

test("initialise correctly with initialValue", () => {
  const { getByTestId } = render(
    <Formik initialValues={{ birthdate: "1988 03 22" }}>
      {() => (
        <Form>
          <FormikBirthdate format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  expect(getByTestId("bday-day")).toHaveValue(22);
  expect(getByTestId("bday-month")).toHaveValue("3");
  expect(getByTestId("bday-year")).toHaveValue(1988);
});

test("Not providing a default should render birthdate with disabled inputs until month is selected", () => {
  const { getByTestId } = render(
    <Formik>
      {() => (
        <Form>
          <FormikBirthdate format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");

  expect(inputDay).toHaveValue(null);
  expect(selectMonth).toHaveValue("default");
  expect(inputYear).toHaveValue(null);

  expect(inputDay).toBeDisabled();
  expect(inputYear).toBeDisabled();

  fireEvent.change(selectMonth, { target: { value: "10" } });
  expect(selectMonth).toHaveValue("10");
  expect(inputDay).not.toBeDisabled();
  expect(inputYear).not.toBeDisabled();
});

test("Changing the date should update birthdate Field value", () => {
  const { getByTestId } = render(
    <Formik initialValues={{ birthdate: "1988 04 22" }}>
      {({ values }) => (
        <Form>
          <div data-testid="birthdate-value">{values.birthdate}</div>
          <FormikBirthdate format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");
  const birthdateFieldValue = getByTestId("birthdate-value");

  fireEvent.change(selectMonth, { target: { value: "6" } });
  fireEvent.change(inputDay, { target: { value: 30 } });
  fireEvent.change(inputYear, { target: { value: 1999 } });

  expect(inputDay).toHaveValue(30);
  expect(selectMonth).toHaveValue("6");
  expect(inputYear).toHaveValue(1999);
  expect(birthdateFieldValue).toHaveTextContent("1999 06 30");
});

test("Entering an incorrect date should show an error msg", () => {
  const { getByTestId, getByText } = render(
    <Formik initialValues={{ birthdate: "1988 03 22" }}>
      {() => (
        <Form>
          <FormikBirthdate format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");

  fireEvent.change(selectMonth, { target: { value: "02" } });
  fireEvent.change(inputDay, { target: { value: 30 } });
  fireEvent.change(inputYear, { target: { value: 1999 } });

  expect(getByText("Date invalid"));
});

test("You should be able to change the error message using prop", () => {
  const { getByTestId, getByText } = render(
    <Formik initialValues={{ birthdate: "1988 03 22" }}>
      {() => (
        <Form>
          <FormikBirthdate errorMsg="My custom error" format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");

  fireEvent.change(selectMonth, { target: { value: "02" } });
  fireEvent.change(inputDay, { target: { value: 30 } });
  fireEvent.change(inputYear, { target: { value: 1999 } });

  expect(getByText("My custom error"));
});

test("You should be able to hide the error message using prop", () => {
  const { getByTestId, queryByText } = render(
    <Formik initialValues={{ birthdate: "1988 03 22" }}>
      {() => (
        <Form>
          <FormikBirthdate showErrorMsg={false} format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");

  fireEvent.change(selectMonth, { target: { value: "02" } });
  fireEvent.change(inputDay, { target: { value: 30 } });
  fireEvent.change(inputYear, { target: { value: 1999 } });

  expect(queryByText("Date invalid")).toBeNull();
});

test("Providing an age below minAge should throw an error", () => {
  const { getByTestId, getByText } = render(
    <Formik>
      {() => (
        <Form>
          <FormikBirthdate minAge={18} format="yyyy MM dd" />
        </Form>
      )}
    </Formik>
  );

  const { year, month, day } = DateTime.local()
    .plus({ day: 1 })
    .toObject();

  const inputDay = getByTestId("bday-day");
  const selectMonth = getByTestId("bday-month");
  const inputYear = getByTestId("bday-year");

  fireEvent.change(selectMonth, { target: { value: month } });
  fireEvent.change(inputDay, { target: { value: day } });
  fireEvent.change(inputYear, { target: { value: year } });

  expect(getByText("Date invalid"));
});

// Should be able to change  format
