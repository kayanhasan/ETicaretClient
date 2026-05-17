import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './admin/layout/layout';
import { Dashboards} from './admin/components/dashboards/dashboards';
import { Home } from './ui/components/home/home';
import { authGuard } from './guards/common/auth-guard';
import { Login } from './ui/components/login/login';



const routes: Routes = [
  {path:"admin",component:Layout,children:[
    {path:"",component:Dashboards,canActivate:[authGuard]},
    {path:"customers",loadChildren:()=>import("./admin/components/customers/customers-module").then(module=>module.CustomersModule),canActivate:[authGuard]},
    {path:"products",loadChildren:()=>import("./admin/components/products/products-module").then(module=>module.ProductsModule),canActivate:[authGuard]},
    {path:"orders",loadChildren:()=>import("./admin/components/orders/orders-module").then(module=>module.OrdersModule),canActivate:[authGuard]},
    { path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu-module").then(module => module.AuthorizeMenuModule), canActivate: [authGuard] },
     { path: "roles", loadChildren: () => import("./admin/components/role/role-module").then(module => module.RoleModule), canActivate: [authGuard] },
     { path: "users", loadChildren: () => import("./admin/components/user/user-module").then(module => module.UserModule), canActivate: [authGuard] }
  ],canActivate:[authGuard]},
  {path:"",component:Home},
  {path:"baskets",loadChildren:()=>import("./ui/components/baskets/baskets-module").then(module=>module.BasketsModule)},
  {path:"products",loadChildren:()=>import("./ui/components/products/products-module").then(module=>module.ProductsModule)},
  {path: "products/:pageNo", loadChildren: () => import("./ui/components/products/products-module").then(module => module.ProductsModule)},
  {path:"register",loadChildren:()=>import("./ui/components/register/register-module").then(module=>module.RegisterModule)},
 { path: 'login', component: Login },
   { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset-module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password-module").then(module => module.UpdatePasswordModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
