import React from "react";
import * as Yup from 'yup'
import { Formik } from "formik";
import { MTableEditRow } from "material-table";

const FormikEditRow = ({ onEditingApproved, ...props }) => {
    return (
      <Formik
        initialValues={props.data}
        validationSchema= { Yup.object({
          productName: Yup
              .string()       
              .trim('The first name cannot include leading and trailing spaces')
              .strict(true)
              .required('Required'),
          quantity: Yup
              .number()
              .typeError('Invalid Input: numbers please')
              .positive('Must be greater than zero')
              .integer()
              .required('Required'),
          priceNet: Yup
              .number()
              .typeError('Invalid Input: numbers please')
              .positive('Must be greater than zero')
              .integer()
              .required('Required'),
          tax: Yup
              .number()
              .typeError('Invalid Input: numbers please')
              .positive('Must be greater than zero')
              .integer()
              .required('Required'),
        })
      }
        onSubmit={data => {
          if (props.mode === "add" || props.mode === "update") {
            const { tableData, ...newData } = data;
            onEditingApproved(props.mode, newData, props.data);
          } else {
            onEditingApproved(props.mode, data, props.data);
          }
        }}
      >
        {({ submitForm }) => (
          <MTableEditRow {...props} onEditingApproved={submitForm} />
        )}
      </Formik>
    );
  };
  
export default FormikEditRow