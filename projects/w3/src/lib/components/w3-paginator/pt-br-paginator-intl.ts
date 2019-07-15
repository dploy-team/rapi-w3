import { MatPaginatorIntl } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

// const ptBrRangeLabel = (page: number, pageSize: number, length: number) => {
//     if (length == 0 || pageSize == 0) {
//         return `0 de ${length}`;
//     }

//     length = Math.max(length, 0);

//     const startIndex = page * pageSize;

//     // If the start index exceeds the list length, do not try and fix the end index to the end.
//     const endIndex = startIndex < length ?
//         Math.min(startIndex + pageSize, length) :
//         startIndex + pageSize;

//     return `${startIndex + 1} - ${endIndex} de ${length}`;
// };

// export function getPtBrPaginatorIntl() {
//     const paginatorIntl = new MatPaginatorIntl();

//     paginatorIntl.itemsPerPageLabel = 'Itens por página:';
//     paginatorIntl.nextPageLabel = 'Próxima página';
//     paginatorIntl.previousPageLabel = 'Página anterior';
//     paginatorIntl.getRangeLabel = ptBrRangeLabel;

//     return paginatorIntl;
// }

export class TranslatedMatPaginatorIntl extends MatPaginatorIntl {
  translateService: TranslateService;
  itemsPerPageLabel = "Items per page";
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";

  getRangeLabel = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return "0 of " + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return (
      startIndex +
      1 +
      " - " +
      endIndex +
      this.translateService.instant("COMMONS.LIST.DE") +
      length
    );
  };

  injectTranslateService(translate: TranslateService) {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translateService.instant(
      "COMMONS.LIST.ITEN_PER_PAGE"
    );
  }
}
