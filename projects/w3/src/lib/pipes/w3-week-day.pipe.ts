import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe para dias da semana
 */
@Pipe({
  name: "w3WeekDay"
})
export class W3WeekDayPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "mon":
        return "Segunda-feira";

      case "tue":
        return "Terça-feira";

      case "wed":
        return "Quarta-feira";

      case "thu":
        return "Quinta-feira";

      case "fri":
        return "Sexta-feira";

      case "sat":
        return "Sábado";

      case "sun":
        return "Domingo";

      default:
        return value;
    }
  }
}
