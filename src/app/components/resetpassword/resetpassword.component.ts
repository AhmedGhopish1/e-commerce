import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, ],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

   private readonly _FormBuilder=inject(FormBuilder);
    private readonly _AuthService = inject(AuthService);
    private readonly _Router = inject(Router);
      private readonly _ToastrService = inject(ToastrService);
    
  



   resetPassForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  
    })

    resetPass():void{

      console.log(this.resetPassForm)
      this._AuthService.resetPassword(this.resetPassForm.value).subscribe({

        next:(res)=>{

          this._ToastrService.info('sucess','Fresh Cart')
          this._Router.navigate(['/login'])
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }

      })

    }

}
