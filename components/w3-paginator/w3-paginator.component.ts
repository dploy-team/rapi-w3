import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material';

@Component({
  selector: 'rapi-w3-paginator',
  templateUrl: './w3-paginator.component.html',
  styleUrls: ['./w3-paginator.component.scss']
})
export class W3PaginatorComponent implements OnInit {

  @Input() pagination: any;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {

  }

  changePage(event): void {
    this.onChange.emit(event);
  }
}
