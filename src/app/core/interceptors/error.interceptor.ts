import { error } from 'node:console';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService =inject(ToastrService)

  return next(req).pipe(
    catchError(  (err)=> {
      console.log(err.error.message)

      // _ToastrService.error(err.error.message, 'Fresh Cart', {timeOut:2000, closeButton:true, easeTime:300 ,extendedTimeOut:1000})

      return throwError(()=> err)
    } )
  );
};
