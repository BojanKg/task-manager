import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../to-do.model';

@Pipe({
  name: 'usersSearch'
})
export class UsersSearchPipe implements PipeTransform {

  transform(items: ToDo[], searchTerm: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      return item.taskName!.toLowerCase().includes(searchTerm);
    });
  }

}
