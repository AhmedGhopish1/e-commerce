import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';

import { error, log } from 'console';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink,SlicePipe,FormsModule, SearchPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(
     private _ProductsService:ProductsService ,
     private _CategoriesService:CategoriesService,
     private _CartService:CartService,
     private _ToastrService:ToastrService,
     private _WishlistService:WishlistService,
     private _NgxSpinnerService:NgxSpinnerService){}

  categorySlider: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  mainSlider: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:3000,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  productsData!:Iproduct[];
  categoryData!:ICategory[]
  productSub!:Subscription;
  catSub!:Subscription;
  addToWishUnSub!:Subscription;
  removeToWishUnSub!:Subscription;
  searchInputValue:string='';
  wishlistData!:Iwishlist[];

  addToCart(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'FreshCart', {timeOut:2000, closeButton:true, easeTime:300})

       this._CartService.cartCount.next(res.numOfCartItems)

        console.log(res)
      },
     
    })
  }

  addToWishList(p_id:string){
  
   this.addToWishUnSub = this._WishlistService.addItemToWishList(p_id).subscribe({
     next:(res)=>{
       this._ToastrService.info(`${res.message}❤ 😍` ,'FreshCart ❤', {timeOut:2000, closeButton:true, easeTime:300})
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
   this.removeToWishUnSub =  this._WishlistService.removeItemFromWishList(p_id).subscribe({
 
       next:(res)=>{
         console.log(res)
         this._WishlistService.getloggedWishList().subscribe({
 
           next:(res)=>{
             this.wishlistData = res.data
             this._ToastrService.info('Product removed successfully to your wishlist','FreshCart🙃', {timeOut:2000, closeButton:true, easeTime:300})
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

   this.productSub= this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{

        this.productsData=res.data
        console.log(this.productsData)
        
        
      },

      // error:(error)=>{
      //   console.log(error)
      // }
    })

    this.catSub=this._CategoriesService.getCategoryData().subscribe({

      next:(res)=>{
        this.categoryData=res.data;
        console.log(this.categoryData)
      }
    })


    this._WishlistService.getloggedWishList().subscribe({
 
      next:(res)=>{
        this.wishlistData = res.data
        console.log(res)
      }

    })

  }

  ngOnDestroy(){

    this.productSub?.unsubscribe();
    this.addToWishUnSub?.unsubscribe();
    this.removeToWishUnSub?.unsubscribe();
  }

 


}
