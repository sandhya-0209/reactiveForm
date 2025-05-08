import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSpaceValidator{
   static noSpace(control: AbstractControl): ValidationErrors | null{
     let val : string = control.value;
     if(!val){
        return null;
     }

     if(val.includes(" ")){
       return{
        noSpaceBar : `Spacebar is not allowed`
       }
     }else{
        return null
     }
  }
}