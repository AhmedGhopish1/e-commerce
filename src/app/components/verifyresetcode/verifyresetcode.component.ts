import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verifyresetcode',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './verifyresetcode.component.html',
  styleUrl: './verifyresetcode.component.css'
})
export class VerifyresetcodeComponent {

  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  errmessage!:string
  errorCode:boolean=false

   verifyCodeForm:FormGroup=this._FormBuilder.group({
  
    resetCode:[null,[Validators.required]]
  
    })

    verifyCode():void{


      this._AuthService.verifyCode(this.verifyCodeForm.value).subscribe({

        next:(res)=>{
          this._ToastrService.info(res.status, 'Fresh Cart')
          this._Router.navigate(['/resetpassword'])
          console.log(res)
          
        },

        error:(err)=>{
          this.errorCode=true
          this.errmessage = err.error.message
          
          console.log(err)
        }

      })

      console.log(this.verifyCodeForm)

    }

}
