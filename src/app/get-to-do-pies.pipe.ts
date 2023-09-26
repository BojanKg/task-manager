import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getToDoPies'
})
export class GetToDoPiesPipe implements PipeTransform {

  transform(value: string | any): string {
    if (!value) {
      return value;
    }

    const date = value;
    const dateGet: Date = new Date(date);

    const day: number = date.getUTCDate();
    const month: number = date.getUTCMonth() + 1;
    const year: number = date.getUTCFullYear();

    const formattedDate: string = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    return formattedDate;
  }
}
