import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartErrorComponent } from './cart-error/cart-error.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'seller-auth',
        component:SellerAuthComponent
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate:[authGuard]
    },
    {
        path:'seller-add-product',
        component:SellerAddProductComponent
    },
    {
        path:'seller-update-product/:id',
        component:SellerUpdateProductComponent
    },
    {
        path:'details/:productId',
        component:ProductDetailsComponent
    },
    {
        path:'user-auth',
        component:UserAuthComponent
    },
    {
        component:CartPageComponent,
        path:'cart-page'
    },
    {
        component:CartErrorComponent,
        path:'cart-error'
    },
    {
        component:CheckoutComponent,
        path:'checkout'
    },
    {
        component:MyOrdersComponent,
        path:'my-orders'
    }
];
