import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { guardGuard } from './admin/guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [guardGuard],
        children: [
          { path: '', component: AdminComponent },
          { path: 'add-product', component: AddProductComponent },
        ],
      },
    ],
  },
];
