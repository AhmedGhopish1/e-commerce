import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {

private readonly _FormBuilder=inject(FormBuilder);
private readonly _AuthService = inject(AuthService);
private readonly _Router = inject(Router);
private readonly _ToastrService = inject(ToastrService)

resetCode!:string


  forgetPasswordForm:FormGroup=this._FormBuilder.group({

    email:[null,[Validators.required, Validators.email]]

  })

  forgetpass():void{
  
   if(this.forgetPasswordForm.valid){

      
    this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({

      next:(res)=>{
        this._ToastrService.info(res.message, 'Fresh Cart')
        console.log(res)
        this.resetCode=res.message

      }


    })
    this._Router.navigate(['/verifycode']);
    console.log(this.forgetPasswordForm)
    }
  
   }

  ngOnInit(): void {


    
  }

 

}
