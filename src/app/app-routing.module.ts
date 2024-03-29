import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { LoginComponent } from './share/login/login.component';
import { TableListComponent } from './admin/table-list/table-list.component';
import { TableDataComponent } from './admin/table-data/table-data.component';


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
        path: 'Table-List',
        component: TableListComponent
      },
      {
        path: 'Table-Data',
        component: TableDataComponent,
      },
      
    ]
  },
  { path: 'Admin/Table-Data/:id', component: TableDataComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
