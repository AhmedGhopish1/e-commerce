import { Subcategory } from './../../core/interfaces/iproduct';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Iwishlist } from '../../core/interfaces/iwishlist';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe,FormsModule, RouterLink, NgClass, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

 

  constructor(
    private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _WishlistService:WishlistService){}

    productSub!:any;
    productRes!:Iproduct[]
    searchInput:string='';
    wishLisFlag:boolean=true
    wishlistData!:Iwishlist[];

   

   

    addToCart(p_id:string){
      this._CartService.addItemToCart(p_id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'FreshCart', {timeOut:2000, closeButton:true})

          this._CartService.cartCount.next(res.numOfCartItems)

          console.log(res)
        }
        
      })
    }
  
    addToWishList(p_id:string){
  
     this._WishlistService.addItemToWishList(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.info(`${res.message}❤ 😍` ,'FreshCart❤', {timeOut:2000, closeButton:true, easeTime:300})
        this._WishlistService.getloggedWishList().subscribe({
  
          next:(res)=>{
            this.wishlistData = res.data
            console.log(res)
          }
    
        })
        
      }
     })
  
    }
    
    removeItem(p_id:string):void{
      this._WishlistService.removeItemFromWishList(p_id).subscribe({
  
        next:(res)=>{
          console.log(res)
          this._WishlistService.getloggedWishList().subscribe({
  
            next:(res)=>{
              this.wishlistData = res.data
              this._ToastrService.info('Product removed 🙃 successfully to your wishlist','FreshCart', {timeOut:2000, closeButton:true, easeTime:300})
              console.log(res)
            }
      
          })
    
  
          
        }
  
      })

      
     
  
    }


    check(p_id:string):boolean{

     return this.wishlistData?.some(item=> item._id == p_id)
    
    }

    
  ngOnInit(){

    this.productSub=this._ProductsService.getAllProducts().subscribe({

      next:(res)=>{
        this.productRes=res.data;
        console.log(this.productRes)
        
      }
      

    })

    this._WishlistService.getloggedWishList().subscribe({

      next:(res)=>{
        this.wishlistData = res.data
      }

    })

  }

  ngOnDestroy(){

    this.productSub?.unsubscribe()
  }


  

}
