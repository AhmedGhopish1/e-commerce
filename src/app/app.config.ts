import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { requestInterceptor } from './core/interceptors/request.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration:'enabled'})),
    provideToastr()
    ,provideHttpClient(withFetch(),withInterceptors([requestInterceptor, errorInterceptor, loadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule), provideClientHydration()]
};
