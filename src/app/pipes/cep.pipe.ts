import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length !== 8) {
      return value;
    }
    return `${value.slice(0, 5)}-${value.slice(5)}`;
  }
}
