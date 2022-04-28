import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private small_screen_position: 'top-center' = 'top-center';
  private large_screen_position: 'top-right' = 'top-right';
  private defaultStyle = {
    style: {
      'box-shadow':
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      padding: '16px',
    },
  };
  constructor(
    private toaster: HotToastService
  ) {}
  public successNotification(message: string = '') {
    this.toaster.success(message, {
      position: this.large_screen_position,
      ...this.defaultStyle,
    });
  }
  public warningNotification(message: string = '') {
    this.toaster.warning(message, {
      position: this.large_screen_position,
      ...this.defaultStyle,
    });
  }
  public errorNotification(message: string = '') {
    let style = { ...this.defaultStyle.style, ...{ color: '#dc3545' } };

    this.toaster.error(message, {
      position: this.large_screen_position,
      style,
      dismissible: true,
    });
  }
}
