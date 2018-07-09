import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToString'
})
export class ConvertMonthToStringPipe implements PipeTransform {

  MonthNames: string[] = [
    'The Singularity',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  transform(value: number): any {
    return this.MonthNames[value];
  }



}
