import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { RouterEnum } from 'src/app/enums/router.enum';
import { AutoUnSubscribeService } from '@core/services/auto-unsubscribe/auto-un-subscribe.service';
import { NotificationService } from '@shared/services/notification.service';
import { LoginApiService } from '../../services/api.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AutoUnSubscribeService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginLoader:boolean= false;

  constructor(
    private fb: FormBuilder,
    private api: LoginApiService,
    private destroy$: AutoUnSubscribeService,
    private router: Router,
    private notifier: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get usernamef() {
    return this.loginForm.get('username');
  }
  get passwordf() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  signin() {
    if (!this.loginForm.valid) return;
    else {
      this.loginLoader = true
      this.api
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((d) => {
          this.loginLoader = false;
          if (d?.accessToken) {
            this.notifier.successNotification('Successfully logged in');
            this.router.navigateByUrl(`${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`)
          }
        },(e)=>{
          this.loginLoader = false;
          this.notifier.errorNotification('Sorry, unable to login');
        });
    }
  }
}
