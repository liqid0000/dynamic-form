import React from "react";
import { Field, getIn } from "formik";
import TextField from "@material-ui/core/TextField";
import MaterialTable from "material-table";
import FormikEditRow from '../components/FormikEditRow'
import FormikEditField from '../components/FormikEditRow'
import InputField from '../components/FieldContent/InputField'
import SelectField from '../components/FieldContent/SelectField'

export default function FormDynamic() {

  const [data, setData] = React.useState([
    { id: 1, productName: "", quantity: "", priceNet: "", tax: "", priceGross: "" }
  ]);  
  return (
    <>
    <MaterialTable
      data={data}
      columns={[
        {
          title: "Product Name",
          field: "productName",
          editComponent: props => (
            <Field name={props.columnDef.field}>
              {({ field, form }) => {
                const { name } = field;
                const { errors, setFieldValue } = form;
                const showError = !!getIn(errors, name);
                return (
                  <TextField
                     id="standard-error-helper-text"
                    {...field}
                    error={showError}
                    onChange={event => setFieldValue(name, event.target.value)}
                    helperText={errors.productName ? errors.productName : null}
                  />
                );
              }}
            </Field>
          )
        },
        { title: "Quantity", field: "quantity",
        editComponent: (props, field) => (
          <InputField edit={props} field={field} />           
          )
        },
        { title: "Price Net", field: "priceNet",
        editComponent: (props, field) => (
          <InputField edit={props} field={field} />        
          )
        },
        { title: "Tax", field: 'tax',      
        editComponent: (props, field) => (        
          <SelectField edit={props} field={field} />
        )},
        { title: "Price Gross", field: "priceGross",
        editComponent: props => (
            <Field name={props.columnDef.field}>
              {({ field }) => {     
                return (
                  <TextField
                  {...field}
                    id="standard-error-helper-text"                    
                    disabled={true}                                    
                  />
                );
              }}
            </Field>
          )
        },        
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve) => {
            setData([...data, newData]);
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            const dataUpdate = [...data];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
            resolve();
          }),
        onRowDelete: oldData =>
          new Promise((resolve) => {
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve();
          })
      }}
      components={{
        EditRow: FormikEditRow,
        EditField: FormikEditField
      }}
      options={{
        exportButton: true
      }}
      initialFormData={{
        productName: "",
        quantity: "",
        priceNet: "",
        tax:"",
        priceGross: ""
      }}
    />  
    </>
  );
}
