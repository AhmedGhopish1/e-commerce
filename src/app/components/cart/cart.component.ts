import { Icart } from './../../core/interfaces/icart';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {

  constructor(private _CartService:CartService){}

 
  getCartUnsub!:Subscription;
  removeUnsub!:Subscription;
  clearUnsub!:Subscription
  cartData: Icart | null =null


  removeItemFromCart(p_Id:string):void{

    this.removeUnsub = this._CartService.removeItem(p_Id).subscribe({

      next:(res)=>{
        this.cartData=res.data;

        this._CartService.cartCount.next(res.numOfCartItems)

        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }

    })

  }
  

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

      // error:(err)=>{
      //   console.log(err)
      // }

    })

  }


  updateQuantity(p_id:string, count:number):void{

    this._CartService.updateItemQuantity(p_id , count).subscribe({
      next:(res)=>{
        this.cartData=res.data;
        console.log(res)
      },

      
    })

  }


  

  ngOnInit(){

  
    this.getCartUnsub = this._CartService.getLoggedUserCart().subscribe({

      next:(res)=>{
        this.cartData=res.data;
        console.log(this.cartData)
        

      },
      
    })

  }


  ngOnDestroy(){
    this.getCartUnsub?.unsubscribe();
    this.removeUnsub?.unsubscribe();
    this.clearUnsub?.unsubscribe();
  }


  

}
