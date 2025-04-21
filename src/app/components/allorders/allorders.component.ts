import { CurrencyPipe, DatePipe } from '@angular/common';
//import { , CartItem } from './../../core/interfaces/iallorders';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { IallOrders } from '../../core/interfaces/iallorders';
import { Icartitems } from '../../core/interfaces/icartitems';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit, OnDestroy{

  private readonly _PaymentService = inject(PaymentService)
  private readonly _AuthService = inject(AuthService)

  userDecodedId!:any
  getUserOrdersUnsub!:Subscription;
  getAllOrders!:IallOrders[];
  cartItemss!:Icartitems[];
  pyamentUnSub!:Subscription

ngOnInit(): void {

 this.userDecodedId = this._AuthService.decodeUserToken();
 console.log(this.userDecodedId)

 this._PaymentService.getAllOrders().subscribe({

  next:(res)=>{

    this.getAllOrders=res.data
    this.cartItemss = res.data
    
    console.log(this.getAllOrders)
    console.log(this.cartItemss)

  }
})

}


ngOnDestroy(): void {
  
  this.pyamentUnSub?.unsubscribe()
}

}
