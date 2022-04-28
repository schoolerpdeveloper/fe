import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers:[LoginApiService]
})
export class AuthModule { }
