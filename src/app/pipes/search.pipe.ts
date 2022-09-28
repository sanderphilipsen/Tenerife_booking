import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'search'
})
export class TestFilterPipe implements PipeTransform {
  transform(items: any, term: any, prop: string): any {
    if (!term || !prop)
      return items;

    if (!items)
     return;

    return items.filter((item: { [x: string]: { toString: () => string; }; }) =>
        item[prop].toString().toLowerCase().includes(term.toLowerCase()));
  }

}

