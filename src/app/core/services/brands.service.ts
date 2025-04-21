import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }

  getBrandDetails(b_id:string|null):Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${b_id}`)

  }
}
