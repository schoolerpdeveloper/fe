import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  host: {
    'class': 'animate__animated animate__zoomIn animate__slow animate__infinite'
  },
  template: ``,
  styles: [`
    :host {
      display: block;
      width: var(--skeleton-rect-width);
      height: var(--skeleton-rect-height);
      background: rgb(218, 238, 212) no-repeat;
    }
  `]
})
export class SkeletonLoaderComponent implements OnInit {

  width: string = '0';
  height: string = '0';
  className: string = 'pulse';

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }

    host.style.setProperty('--skeleton-rect-width', this.width ?? '100%');
    host.style.setProperty('--skeleton-rect-height', this.height ?? '20px');
  }

}
