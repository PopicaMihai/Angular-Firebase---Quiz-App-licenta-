import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentPipe'
})
export class StudentPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const newArray = [];

    if (Array.isArray(value) && args[0]) {
      for (let index = 0; index < value.length; index++) {
        const item = value[index];

        if (args[0][item.section]) {
          newArray.push(item);
        }
      }
      return newArray;
    }    
    return [];
  }

}
