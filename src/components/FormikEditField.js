import React from "react";
import { Field, getIn } from "formik";
import { MTableEditField } from "material-table";

const FormikEditField = props => (
    <Field name={props.columnDef.field}>
      {({ field, form }) => {
        const { name } = field;
        const { errors, setFieldValue } = form;  
        const showError = !!getIn(errors, name);  
        return (
          <MTableEditField
            {...props}
            {...field}
            error={showError}
            onChange={newValue => setFieldValue(name, newValue)}
          />
        );
      }}
    </Field>
  );
export default FormikEditField