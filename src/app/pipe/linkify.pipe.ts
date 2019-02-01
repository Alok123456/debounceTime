import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(str: string, args?: any): string {
    return  'I am {<a>value</a>}. Click Here.';
  }

}
