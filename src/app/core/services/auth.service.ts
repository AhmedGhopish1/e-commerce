import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  decodeInfo!:any;

  regiserUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,userData)
  }

  loginUser(userData:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,userData)
  }

  forgetPassword(form:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,form)

  }

  verifyCode(code:object):Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, code)
    
  }

  resetPassword(resetobject:object):Observable<any>{

    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,resetobject)
    
  }

  decodeUserToken():void
  {
    
    if(sessionStorage.getItem('token')!=null)
      {
       this.decodeInfo = jwtDecode(sessionStorage.getItem('token')!)
       console.log(this.decodeInfo)
       
      }
       
  }


}
