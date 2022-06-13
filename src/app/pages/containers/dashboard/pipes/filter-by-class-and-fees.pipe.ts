import { Pipe, PipeTransform } from '@angular/core';
import { IPaginator } from '@shared/models/paginator.model';
import { IStudentDetails } from '@shared/models/studentDetails';
import { IStudentList } from '@shared/models/studentDetails/student-details.interface';

@Pipe({
  name: 'filterByClassFeesNames',
})
export class FilterByClassAndFeesPipe implements PipeTransform {
  transform(
    value: IStudentList[] | [],
    classes?: string[],
    fees?: string[],
    name?: string,
    res:'count'|'array'='array'
  ): any {
    let temp = [...value];
    if (classes && classes.length > 0) {
      temp = temp.filter((i: IStudentList) => {
        if (i.CLASS_NAME && classes.includes(i?.CLASS_NAME)) return i;
        return;
      });
    }
    if (fees && fees.length > 0) {
      temp = temp.filter((i: IStudentList) => {
        if (i.FEES_STATUS && fees.includes(i?.FEES_STATUS)) return i;
        return;
      });
    }

    if (name) {
      temp = temp.filter((i: IStudentList) => {
       
        if (i.STUD_FIRST_NAME && i.STUD_FIRST_NAME.toLowerCase().includes(name.toLowerCase())) return i;

        // else if (i.STUD_LAST_NAME && i.STUD_LAST_NAME.includes(name)) return i;
        return;
      });
    }

    if(res === 'count') return temp.length as number;
    if(res === 'array')  return (temp as IStudentList[]);
    return value;

   
  }
}
