import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _PaymentService = inject(PaymentService)

  cartId!:string | null;
  

  checkoutForm:FormGroup =this._FormBuilder.group({
    details:[null,[Validators.required]],
    phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null, [Validators.required,Validators.minLength(3)]]

  })


  payment():void{
    if(this.checkoutForm.valid)
    {
      
    console.log(this.checkoutForm)
    this._PaymentService.checkOutSession(this.cartId ,this.checkoutForm.value).subscribe({

      next:(res)=>{
        console.log(res)
        window.open(res.session.url,'_self')
      }

    })

    }
    else
    {
      console.log(this.checkoutForm)
      this.checkoutForm.markAllAsTouched()
    }
  }


ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({

    next:(param)=>{

      this.cartId=param.get('cart_id')
      console.log(this.cartId);

    }

  })

}


}
