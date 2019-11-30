import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe para numero de telefone
 */
@Pipe({
  name: "w3Phone"
})
export class W3PhonePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let str = value + "";

    str = str.replace(/\D/g, "");

    if (str.length === 11) {
      str = str.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      str = str.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return str;
  }
}
