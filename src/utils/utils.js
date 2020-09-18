export const calculateTax = (quantity, priceNet, tax) => {
    let valueNet
    let valueTax
    let valueTotal
    if(quantity && priceNet && tax){
        valueNet = quantity*priceNet;
        valueTax = valueNet*tax*0.01
        valueTotal = valueNet + valueTax;
    }else{
        valueTotal = 0;
    }
    
 
return valueTotal
}