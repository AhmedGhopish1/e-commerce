import { Iproduct } from './../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { info } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { Iwishlist } from '../../core/interfaces/iwishlist';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private readonly _WishlistService=inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService)

  constructor(){}
  
  productId!:string | null;
  
  // productDetails:Iproduct= {} as Iproduct; ===> productDetails =>truethy value  (ال condition in html هيبقى دائما ب تروو وباتالى الايرور الى فى الكونسول مش هيتحل)
  productDetails:Iproduct | null=null;
  wishlistData!:Iwishlist[]; //ده الحل
  addToWishUnSub!:Subscription;
  removeToWishUnSub!:Subscription;

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:2000,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
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



  


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({

      next:(info)=>{
        this.productId=info.get('p_id');
        console.log(info.get('p_id'))
      }

    })


    this._ProductsService.getProductDetails(this.productId).subscribe({

      next:(res)=>{

        this.productDetails=res.data
        console.log(this.productDetails)
        
      }

    })

    this._WishlistService.getloggedWishList().subscribe({
 
      next:(res)=>{
        this.wishlistData = res.data
        console.log(res)
      }

    })

  }




  addToCart(p_id:string){
    this._CartService.addItemToCart(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'FreshCart', {timeOut:2000,closeButton:true})
        this._CartService.cartCount.next(res.numOfCartItems)
        console.log(res)
      },
      // error:(error)=>{
      //   this._ToastrService.error(error.message,'FreshCart', {timeOut:2000, closeButton:true}) // we create interceptor cath the errors
      //   console.log(error)
      // }
    })
  }

  addToWishList(p_id:string){
  
    this.addToWishUnSub = this._WishlistService.addItemToWishList(p_id).subscribe({
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
    this.removeToWishUnSub =  this._WishlistService.removeItemFromWishList(p_id).subscribe({
  
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

}
