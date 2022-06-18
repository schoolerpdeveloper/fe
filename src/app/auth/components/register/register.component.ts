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
export class RegisterComponent implements OnInit  {
  loginForm!: FormGroup;

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
      this.api
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((d) => {
          if (d?.accessToken) {
            this.notifier.successNotification('Successfully logged in');
            this.router.navigateByUrl(`${RouterEnum.CONTAINER}/${RouterEnum.DASHBOARD}`)
          }
        });
    }
  }
}
