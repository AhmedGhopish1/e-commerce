import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { register } from 'module';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistService } from './core/services/wishlist.service';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { CheckoutCashComponent } from './components/checkout-cash/checkout-cash.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { VerifyresetcodeComponent } from './components/verifyresetcode/verifyresetcode.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';

export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'', component:AuthComponent, children:[
        {path:'', redirectTo:'login',pathMatch:'full'},
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
        {path:'forgetpassword', component:ForgetpasswordComponent, title:'forgetpassword'},
        {path:'verifycode', component:VerifyresetcodeComponent, title:'verifycode'},
        {path:'resetpassword', component:ResetpasswordComponent, title:'resetpassword'},
    ]},

    {path:'',component:MainComponent,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'Home'},
        {path:'products',component:ProductsComponent,title:'products'},
        {path:'cart',component:CartComponent, title:'Cart'},
        {path:'brands',component:BrandsComponent, title:'Brands'},
        {path:'categories',component:CategoriesComponent ,title:'Categories'},
        {path:'Details/:p_id',component:ProductDetailsComponent ,title:'Details'},
        {path:'catDetail/:c_id',component:CategorydetailsComponent ,title:'Category'},
        {path:'brandDetail/:b_id',component:BrandDetailsComponent ,title:'Category'},
        {path:'wishlist', component:WishListComponent, title:'WishList'},
        {path:'checkout/:cart_id', component:CheckoutComponent, title:'CheckOut'},
        {path:'checkoutcash/:cart_id', component:CheckoutCashComponent, title:'CheckOut'},//online checkout
        {path:'allorders', component:AllordersComponent, title:'All Orders'},
        {path:'**',component:NotFoundComponent}
       
    ],canActivate:[authGuard]},

    
    
    
];
