import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}


  loading:boolean=false;
  responseMessage!:string;
  successFlag:boolean=false;
  ErrorFlag:boolean=false;
  // messageError!:string;
  registerSub!:Subscription;
  intervalId!:any;




  registerForm:FormGroup = new FormGroup({

    name:new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  },this.confirmPassword)
  
  confirmPassword(g:AbstractControl){
    if(g.get('rePassword')?.value === g.get('password')?.value)
    {
      return null;
    }
    else
    return {missmatch:true};
    
  }

  regesterUser()
  {
    if(this.registerForm.valid)
    {
      this.loading=true
      console.log(this.registerForm)

     this.registerSub = this._AuthService.regiserUser(this.registerForm.value).subscribe({
        next:(res)=>{
          this.loading=false
          this.successFlag=true
          console.log(res)
          this.responseMessage=res.message;
          this.intervalId= setInterval(() => {
            this._Router.navigate(['/login'])
          }, 2000);
        },
        error:(error)=>{
          this.loading=false;
          this.ErrorFlag=true;
          this.responseMessage=error.error.message;
          console.log(error)
          
        },
        complete:()=>{}
      })
    }
    else
    {
      this.registerForm.setErrors({missmatch:true})
      this.registerForm.markAllAsTouched()
    }
      
  }

  ngOnDestroy(){
    clearInterval(this.intervalId)
    this.registerSub?.unsubscribe();
  }
}
