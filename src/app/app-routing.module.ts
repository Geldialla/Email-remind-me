import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { LoginComponent } from './share/login/login.component';
import { TableListComponent } from './admin/table-list/table-list.component';
import { TableDataComponent } from './admin/table-data/table-data.component';
import { CategoryDetailComponent } from './admin/category-detail/category-detail.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Admin', component: AdminpageComponent,
    children: [
      {
        path: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'Table-List',
        component: TableListComponent
      },
      {
        path: 'Table-Data',
        component: TableDataComponent,
      },
      {
        path: 'Category-Data',
        component: CategoryDetailComponent,
      },
      {
        path: 'Category-List',
        component: CategoryListComponent,
      },
      
    ]
  },
  { path: 'Admin/Table-Data/:id', component: TableDataComponent },
  { path: 'Admin/Category-Data/:id', component: CategoryDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
