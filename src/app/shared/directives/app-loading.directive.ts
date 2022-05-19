import {
  ComponentFactoryResolver,
  Directive,
  Input,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Directive({
  selector: '[appLoader]',
})
export class AppLoadingDirective {
  private hasView = false;
  @Input() set appLoader(condition: boolean|null) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}


}
