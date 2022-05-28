import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modalWindowSubmitPipe'
})
export class ModalWindowSubmitPipePipe implements PipeTransform {

  transform(value: {[key:string]:any}): any {
    let noFalsyLen =Object.values(value).filter(i=>i===false && i).length;
    return noFalsyLen === 0 ? true : false;
  }

}
