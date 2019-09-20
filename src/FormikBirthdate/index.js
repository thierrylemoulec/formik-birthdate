import React from "react";
import { DateTime } from "luxon";
import { Field } from "formik";
import Birthdate from "./Birthdate";

// TODO
// - i18n
//    - Rearrange fields

function FormikBirthdate({ name = "birthdate", format, ...rest }) {
  return (
    <Field name={name}>
      {({ field, form }) => {
        const { name } = field;
        const { initialValues, setFieldValue, errors, setFieldError } = form;
        const initialValue = initialValues[name]
          ? DateTime.fromFormat(initialValues[name], format).toObject()
          : null;
        const error = errors[name];
        return (
          <Birthdate
            name={field.name}
            error={error}
            initialValue={initialValue}
            setFieldValue={setFieldValue}
            setFieldError={setFieldError}
            format={format}
            {...rest}
          />
        );
      }}
    </Field>
  );
}

export default FormikBirthdate;
