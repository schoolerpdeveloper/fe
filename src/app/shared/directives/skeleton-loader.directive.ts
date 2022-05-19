import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { SkeletonLoaderComponent } from '@shared/components/skeleton-loader/skeleton-loader.component';

@Directive({ selector: '[skeleton]' })
export class SkeletonLoaderDirective {
  @Input('skeleton') isLoading = false;
  @Input('skeletonRepeat') size = 1;
  @Input('skeletonWidth') width: string='0';
  @Input('skeletonHeight') height: string='0';
  @Input('skeletonClassName') className: string | string[]='';

  constructor(private tpl: TemplateRef<any>, 
              private vcr: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['isLoading']) {
      this.vcr.clear();
      
      if (changes['isLoading'].currentValue) {

         Array.from({ length: this.size }).forEach(() => {
           const ref = this.vcr.createComponent(SkeletonLoaderComponent);
           
           Object.assign(ref.instance, {
             width: this.width === 'rand' ? `${this.random(30, 90)}%` : this.width,
             height: this.height,
             className: Array.isArray(this.className) ? this.className.join(' ') : this.className
           })
         })
      } else {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }
  private random(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }
}