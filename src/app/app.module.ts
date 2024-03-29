import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './share/login/login.component';
import { AdminpageComponent } from './admin/admin-page/adminpage.component';
import { FormsModule } from '@angular/forms';
import { GeldiHttpClientModule } from './services/data-layer/geldi-be-mock.module';
import { TableListComponent } from './admin/table-list/table-list.component';
import { TableDataComponent } from './admin/table-data/table-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminpageComponent,
    TableListComponent,
    TableDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GeldiHttpClientModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
