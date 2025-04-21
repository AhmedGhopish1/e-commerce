import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }
  // clientToken:any={token : sessionStorage.getItem('token')};

  checkOutSession(cart_id:string | null ,paymentFormObject:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cart_id}?url=${environment.url}`,
      {"shippingAddress":paymentFormObject},
      
    )

  }

  createCashOrder(cart_id:string | null ,paymentFormObject:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${cart_id}`,
      {"shippingAddress":paymentFormObject},
      
    )

  }

  getUserOrders(user_id:string):Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${user_id}`)

  }

  getAllOrders():Observable<any>{
    
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/`)

  }

}
