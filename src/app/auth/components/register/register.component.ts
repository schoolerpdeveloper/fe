import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { LoginApiService } from '../../services/api.service';
import { RouterEnum } from 'src/app/enums/router.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: LoginApiService,
    private router: Router,
    private notifier:NotificationService,
    private destroy$: AutoUnSubscribeService
  ) {
    this.regForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      roles: ['', [Validators.required]],
    }, {
      // validator: 
      // ConfirmedValidator('password', 'confirm_password'),
    } as AbstractControlOptions);
  }

  get usernamef() {
    return this.regForm.get('username');
  }
  get emailf() {
    return this.regForm.get('email');
  }
  get confirm_passwordf() {
    return this.regForm.get('confirm_password');
  }
  get rolesf() {
    return this.regForm.get('roles');
  }
  get passwordf() {
    return this.regForm.get('password');
  }
  routeToLogin(){
    this.router.navigateByUrl(`${RouterEnum.AUTH}/${RouterEnum.LOGIN}`)
  }
  ngOnInit(): void {}
  register() {
    if(!this.regForm.valid) return;
    else{
      let {username,email,password,roles} = this.regForm.value;
      roles = [roles]
      this.api.register({username,email,password,roles}).pipe(takeUntil(this.destroy$)).subscribe((d:any)=>{
        if(d?.message && d?.message.toLowercase().includes('user was registered successfully')){
          this.notifier.successNotification(`${d.message}, please login once again`)
          this.routeToLogin();
        }
      });
    }
  }
}
