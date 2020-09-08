import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = value.charAt(0) != 0 ? '0' + value : '' + value;
        let newStr = '';
        let i
        for(  i=0; i < (Math.floor(value.length/2) - 1); i++){
           newStr = newStr+ value.substr(i*2, 2) + '-';
        }
        return newStr+ value.substr(i*2);
  }

}
