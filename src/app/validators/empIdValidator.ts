
import { AbstractControl, ValidationErrors } from "@angular/forms";


export class EmpIdValidator{
   static isEmpIdValid(control : AbstractControl) : ValidationErrors | null{
       let val : string = control.value;
       if(!val){
        return null
       }

    //val === E123 val === valid then return null
    //!val === E123 val === invalid then return errObj

    let regexp = /^[A-Z]\d{3}$/;

    let isvalid = regexp.test(val) // test method return true or false

    if(isvalid){
        return null
    }else{
        return{
            invalidEmpId : `Emp Id must be startwith one Capital letter and 
            ends with 3 numbers like (E123)`
        }
    }

    }
}