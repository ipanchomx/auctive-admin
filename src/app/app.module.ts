import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavBarComponent } from './global/layouts/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateCategoryComponent } from './dialogs/create-category/create-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavBarComponent,
    HomeComponent,
    SidebarComponent,
    CreateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
