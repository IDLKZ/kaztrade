import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncateTextPipe implements PipeTransform {

  transform(text:any,length:number,start:number = 0): string {
    let newStr:string;
    newStr = text.length > length ? text.slice(0,length) + "..." : text;
    return newStr;
  }

}
