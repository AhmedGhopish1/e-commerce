import { Product } from './../../core/interfaces/icartitems';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink, CarouselModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit, OnDestroy {

  private readonly _WishlistService= inject(WishlistService) 
  private readonly _CartService= inject(CartService) 
  private readonly _ToastrService= inject(ToastrService) 
  private readonly _ProductsService =inject(ProductsService)

  getWisUnSub!:Subscription;
  removeUnsub!:Subscription;
  wishListData?: Iproduct []; 
  
  

 


    addToCart(p_id:string){
      this._CartService.addItemToCart(p_id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'FreshCart', {timeOut:2000,closeButton:true})
          this._CartService.cartCount.next(res.numOfCartItems)
          
          console.log(res)
          
        },
        error:(error)=>{
          this._ToastrService.error(error.message,'FreshCart', {timeOut:2000, closeButton:true})
          console.log(error)
        }
      })
    }


   
  removeItem(p_id:any):void{

    this._WishlistService.removeItemFromWishList(p_id).subscribe({

      next:(res)=>{
        console.log(res)
        this._WishlistService.getloggedWishList().subscribe({

          next:(res)=>{
            this.wishListData = res.data
            console.log(res)
          }
    
        })
    

      }

    })
    
  }

 


  ngOnInit(): void {
    
    this.getWisUnSub = this._WishlistService.getloggedWishList().subscribe({

      next:(res)=>{
        this.wishListData = res.data;
        console.log(this.wishListData)
       
      }

    })

  }

  ngOnDestroy(): void {

    this.getWisUnSub?.unsubscribe();
    this.removeUnsub?.unsubscribe();
    
  }

 

  

}
