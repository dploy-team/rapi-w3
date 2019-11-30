import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatPaginator } from "@angular/material";

/**
 * Componente de paginação
 */
@Component({
  selector: "rapi-w3-paginator",
  templateUrl: "./w3-paginator.component.html"
})
export class W3PaginatorComponent implements OnChanges {
  public data = {
    total: 0,
    page: 0,
    per_page: 0
  };

  /**
   * Objeto de paginação
   */
  @Input() pagination: any;

  /**
   * Emmite toda vez que algum valor é alterado
   */
  @Output() onChange = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    const pagination = { ...changes.pagination.currentValue };
    pagination.page = pagination.page > 0 ? pagination.page - 1 : 0;
    this.data = Object.assign({}, this.data, pagination);
  }

  changePage(event): void {
    const data = {
      ...event,
      page: event.pageIndex + 1
    };

    this.onChange.emit(data);
  }
}
