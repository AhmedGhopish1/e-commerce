import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder,private _AuthService:AuthService,private _Router:Router){
  }

   loading:boolean=false;
   errorMassege!:string;

   /* old syntax for build Reactive Forms==>(formGroup and formControl)l */
  // loginForm:FormGroup= new FormGroup({
  //   email: new FormControl(null,[Validators.required,Validators.email]),
  //   password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  // })


  /* best syntax for build Reactive Forms==>(formGroup and formControl)  */
  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]

  },[this.loginUser])



  loginUser():void{
    if(this.loginForm.valid)
    {
      this.loading=true
      console.log(this.loginForm)

      
      this._AuthService.loginUser(this.loginForm.value).subscribe({

        next:(res)=>{
          this.loading=false;
          console.log(res)
          sessionStorage.setItem('token',res.token)
          this._Router.navigate(['/home'])

          this._AuthService.decodeUserToken()

        },

        error:(error)=>{
          this.loading=false;
          this.errorMassege=error.error.message

        }

      })
      

    }
    else
    {
      this.loginForm.markAllAsTouched()
    }
  }

}
