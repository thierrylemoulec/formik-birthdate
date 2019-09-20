import React from "react";
import ReactDOM from "react-dom";
import { Form, Formik } from "formik";
import FormikBirthdate from "./FormikBirthdate";

function App() {
  return (
    <div className="App">
      <Formik>
        {({ values }) => (
          <Form>
            <div>{JSON.stringify(values, null, 2)}</div>
            <FormikBirthdate minAge="18" format="yyyy dd MM" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
