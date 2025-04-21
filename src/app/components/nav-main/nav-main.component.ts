import { Component, ElementRef, HostListener, ViewChild, viewChild, OnInit, OnDestroy } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,LoginComponent],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit, OnDestroy {

  @ViewChild('navbar') navSmooth!:ElementRef;

  constructor(private _Router:Router,
              private _CartService:CartService){}

  displayCartCount!:number;
  cartCountUnsup!:Subscription;
  cartGetLoggedUnsub!:Subscription;


  logOut():void{
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login'])

  }

  @HostListener('window:scroll') smooth(){
    
    if(scrollY)
    {
      this.navSmooth.nativeElement.classList.replace('p-3','p-1')
    }
    else
    {
      this.navSmooth.nativeElement.classList.replace('p-1','p-3')
    }

  }

  ngOnInit(): void {

   this.cartGetLoggedUnsub = this._CartService.getLoggedUserCart().subscribe({

      next:(res)=>{
        this.displayCartCount=res.numOfCartItems;
      }

    })
    
   this.cartCountUnsup = this._CartService.cartCount.subscribe({

      next:(res)=>{
        
        this.displayCartCount=res
      }
      
    })

  }

  ngOnDestroy(): void {
    this.cartCountUnsup?.unsubscribe();
    this.cartGetLoggedUnsub?.unsubscribe();
  }

  

}
