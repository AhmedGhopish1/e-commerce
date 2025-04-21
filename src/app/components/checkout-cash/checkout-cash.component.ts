import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Icart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-checkout-cash',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout-cash.component.html',
  styleUrl: './checkout-cash.component.css'
})
export class CheckoutCashComponent implements OnInit,OnDestroy {

   private readonly _FormBuilder = inject(FormBuilder);
    private readonly _ActivatedRoute= inject(ActivatedRoute)
    private readonly _PaymentService = inject(PaymentService)
    private readonly _CartService = inject(CartService);
    private readonly _Router = inject(Router);

    getCartUnsub!:Subscription;
      clearUnsub!:Subscription
      cartData: Icart | null =null
  
    cartId!:string | null;
    
  
    checkoutFormCash:FormGroup =this._FormBuilder.group({
      details:[null,[Validators.required]],
      phone:[null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required,Validators.minLength(3)]]
  
    })
  
    clearCartItems():void{

      this.clearUnsub = this._CartService.clearCart().subscribe({
        next:(res)=>{
  
        this.getCartUnsub = this._CartService.getLoggedUserCart().subscribe({
  
            next:(res)=>{
              this.cartData=res.data;
              
              this._CartService.cartCount.next(res.numOfCartItems)
  
              console.log(console.log(this.cartData))
              
            },
            error:(error)=>{
              console.log(error)
            }
          })
  
          console.log(res)
  
          
        },
  
        error:(err)=>{
          console.log(err)
        }
  
      })
  
    }
  
    payment():void
    {
      if(this.checkoutFormCash.valid)  
      {
        
         console.log(this.checkoutFormCash)
         this._PaymentService.createCashOrder(this.cartId ,this.checkoutFormCash.value).subscribe({
  
         next:(res)=>
        {
          this._Router.navigate(['/allorders']);
          console.log(res)
         
        }
  
       })
      
       this.clearCartItems()
      
      }


      else
      {
        console.log(this.checkoutFormCash)
        this.checkoutFormCash.markAllAsTouched()
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

  ngOnDestroy(): void {
    
  }


  

}
