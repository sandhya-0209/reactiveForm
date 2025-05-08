import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './const/validationPattern';
import { EmpIdValidator } from './validators/empIdValidator';
import { COUNTRIES_META_DATA } from './const/countries';
import { NoSpaceValidator } from './validators/noSpace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  signUpForm !: FormGroup;
  title = 'reactiveForm';
  countriesArr : Array<any> = COUNTRIES_META_DATA;
  newFormControl = new FormControl('',[Validators.required]);

  ngOnInit(): void {
    this.createSignUpForm();
    this.isAddSameHandler();
    this.patchPermanentAddressHandler();
    this.createDependant();
    this.confirmPassword();
  }
  
  isAddSameHandler(){
    this.f['currentAddress'].valueChanges
    .subscribe(res=>{if(this.f['currentAddress'].valid){
      this.f['isAddSame'].enable()
    }else{
      this.f['isAddSame'].disable();
      this.f['isAddSame'].reset()
    }
  }) 
  }

  patchPermanentAddressHandler(){
    this.f['isAddSame'].valueChanges
    .subscribe(val=> {
        if(val){
         //Patch data of currentAddress to permanentAddress and make permanentAddress disable.
            let currentAdd = this.f['currentAddress'].value;
            this.f['permanentAddress'].patchValue(currentAdd)
            this.f['permanentAddress'].disable()
        }else{
         //val = false permanentAdress reset amd make checkBox enable
            this.f['permanentAddress'].reset()
            this.f['permanentAddress'].enable()
        }
    })
  }

  createSignUpForm(){
    this.signUpForm = new FormGroup({
      userName : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)
        ,Validators.minLength(5),Validators.maxLength(9),NoSpaceValidator.noSpace]),
      email : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.email)]),
      empId:new FormControl(null,[Validators.required,EmpIdValidator.isEmpIdValid]),
      gender : new FormControl(null),
      currentAddress : new FormGroup({
        country : new FormControl("India",[Validators.required]),
        state : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
        city : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
        pincode : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyNumber)])
      }),
    permanentAddress : new FormGroup({
        country : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
        state : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
        city : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyText)]),
        pincode : new FormControl(null,[Validators.required,Validators.pattern(CustomRegex.onlyNumber)])
      }),
      isAddSame : new FormControl({value:false ,disabled:true},[Validators.required]),
      skills : new FormArray([],[Validators.required]),
      dependents : new FormArray([]),
      password : new FormControl(null,[Validators.required,
        Validators.pattern(CustomRegex.password)]),
     confirmPassword : new FormControl({value:null, disabled:true},[Validators.required,
         Validators.pattern(CustomRegex.password)])
    })
  }

  get f(){
    return this.signUpForm.controls
  }

  get skillsArr(){
    return this.f['skills'] as FormArray
  }

  get dependentsArr(){  
    return this.f['dependents'] as FormArray
  }

  createDependant(){
     if(this.dependentsArr.length < 5){
      let dependent = new FormGroup({
        fullName : new FormControl(null,[Validators.required]),
        relationShip : new FormControl(null,[Validators.required]),
        citizenShip : new FormControl(null,[Validators.required]),
        isTravelingWithYou : new FormControl(null,[Validators.required])
      })
      this.dependentsArr.push(dependent)
     }
  }

  confirmPassword(){
    this.f['confirmPassword'].valueChanges
    .subscribe(confirmPassVal=>{
         if(confirmPassVal === this.f['password'].value){
           this.f['confirmPassword'].setErrors(null)
         }else{
           this.f['confirmPassword'].setErrors({
             passAndConfirmMatch : `Password and ConfirmPassword must be same`
           })
         }
    })
 
         this.f['password'].valueChanges
          .subscribe(val=>{
          if(this.f['password'].valid){
           this.f['confirmPassword'].enable()
          }else{
           this.f['confirmPassword'].reset()
           this.f['confirmPassword'].disable()
        }
      })
     }


  onSignUp(){
    // console.log(this.signUpForm)
    if(this.signUpForm.valid){
      // console.log(this.signUpForm)
      console.log(this.signUpForm.value);    
      this.signUpForm.reset();
    }
  }

  addSkill(){
    let skillVal= this.newFormControl.value?.trim();
    // console.log(skillVal)
    this.newFormControl.reset()
    if(skillVal){
      let newControl = new FormControl(skillVal,[Validators.required]);
    this.skillsArr.push(newControl)
    }
  }

  remove(i:number){
     this.skillsArr.removeAt(i)
  }

  OnRemove(i:number){
    this.dependentsArr.removeAt(i);
  }
}
