import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'prettyPipe'
})
export class PrettyPipe {
  transform(val) {
      var data;
      try{
        var val1 = JSON.parse(val);
        data = JSON.stringify(val1, null, 2)
            .replace(' ', '&nbsp;')
             .replace('\n', '<br/>');
      }catch(e){
        data = val;
      }
    
    return data;
      
  }
}