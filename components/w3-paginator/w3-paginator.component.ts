import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'rapi-w3-paginator',
  templateUrl: './w3-paginator.component.html',
  styleUrls: ['./w3-paginator.component.scss']
})
export class W3PaginatorComponent implements OnInit {

  @Input() pagination: any;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    console.log('pagination', this.pagination);

    // this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    // this.paginator._intl.firstPageLabel = 'Primeira página';
    // this.paginator._intl.previousPageLabel = 'Página anterior';
    // this.paginator._intl.nextPageLabel = 'Próxima página';
    // this.paginator._intl.lastPageLabel = 'Última página';
  }

  changePage(event){
    this.onChange.emit(event);
  }
}
