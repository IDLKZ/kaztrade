import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessonStatus'
})
export class LessonStatusPipe implements PipeTransform {

  transform(lesson_id: any, data:any): string {
      if(data.length>0){
        for (var i = 0; i < data.length; i++) {
          if (data[i].lesson_id == lesson_id) {
            if (data[i].status == 1){
              return "<i class= 'fas fa-check-circle'></i>"
              break;
            }
            else{
              return "<i class= 'fas fa-lock-open'></i>"
            }
          }

        }
        return "<i class= 'fas fa-lock-open'></i>"
      }
      else{
        return "<i class= 'fas fa-lock'></i>"
      }



  }

}
