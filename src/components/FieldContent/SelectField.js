

import React from 'react'
import { Field, getIn } from "formik";
import Select from '@material-ui/core/Select';
import { calculateTax } from '../../utils/utils'


const SelectField = (props) => {
    const { edit, field } = props
    return(
        <Field edit={edit} field={field} name={edit.columnDef.field}>
            {({ field, form }) => {
              const { name } = field;
              const { errors, setFieldValue } = form;

              const showError = !!getIn(errors, name);
            return(
                <Select
                {...field}
                native              
                error={showError}
                onChange={event => {
                    setFieldValue(name, event.target.value)
                    var data = { ...edit.rowData };
                    data.tax = event.target.value;
                    edit.onRowDataChange(data);   
                    const value = calculateTax( edit.rowData.quantity, edit.rowData.priceNet, event.target.value)               
                    setFieldValue('priceGross', value)//edit.rowData.quantity*edit.rowData.priceNet*event.target.value)
                }}
                inputProps={{
                  name: 'tax',
                  id: 'tax-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={8}>8</option>
                <option value={23}>23</option>
                <option value={32}>32</option>
              </Select>
                );
            }}
          </Field>
    )
}

export default SelectField