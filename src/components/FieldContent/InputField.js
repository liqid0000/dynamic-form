import React from 'react'
import { Field, getIn } from "formik";
import TextField from "@material-ui/core/TextField";
import { calculateTax } from '../../utils/utils'

const InputField = (props) => {
    const { edit, field } = props
    return(       
    <Field edit={edit} field={field} name={edit.columnDef.field}>
   {({ field, form }) => {
     const { name } = field;
     const { errors, setFieldValue } = form;
     const showError = !!getIn(errors, name);
     console.log(name)
     return (
       <TextField
         id="standard-error-helper-text"
         {...field}                    
         error={showError}
         onChange={event => {
             setFieldValue(name, event.target.value)
             var data = { ...edit.rowData }; 
             data[name] = event.target.value;
             edit.onRowDataChange(data);    
             let value = 0;
             (name === 'priceNet') ? 
             value = calculateTax(edit.rowData.quantity, event.target.value, edit.rowData.tax)  :
             value = calculateTax( event.target.value, edit.rowData.priceNet, edit.rowData.tax)  
             setFieldValue('priceGross', value)
         }}
         helperText={errors.priceNet ? errors.priceNet : null}  
       />
     );
   }}
 </Field>       
    )
} 

export default InputField