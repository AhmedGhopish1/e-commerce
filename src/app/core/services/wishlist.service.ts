import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  // clientToken:any={token : sessionStorage.getItem('token')};

  getloggedWishList():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)

  }

  addItemToWishList(p_id:string):Observable<any>{
    
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {productId : p_id })

  }

  removeItemFromWishList(p_id:any):Observable<any>{

    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${p_id}`)
  }
  

}
