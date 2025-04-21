import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _HttpClient=inject(HttpClient);

  constructor() { }

  getCategoryData():Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  categoryDetails(c_id:string|null):Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${c_id}`)
    
  }

}
