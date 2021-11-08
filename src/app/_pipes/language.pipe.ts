import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  transform(value:any): string {
    if(value == "ru"){
      return  "Руc"
    }
    else if(value == "en"){
      return  "Eng"
    }
    else if(value == "kz"){
      return  "Қаз"
    }
    return  "Руc"

  }

}
