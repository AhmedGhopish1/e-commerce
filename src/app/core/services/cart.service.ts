import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  // 


  cartCount:BehaviorSubject<number> = new BehaviorSubject(0);



  getLoggedUserCart():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)

  }

  addItemToCart(p_id:string):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,{productId:p_id});
  }

  removeItem(pId:any):Observable<any>{
    
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${pId}`)

  }

  clearCart():Observable<any>{

    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,)
  }

  updateItemQuantity(p_id:string,pCount:number):Observable<any>{

   return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`,{count:pCount})

  }

}
