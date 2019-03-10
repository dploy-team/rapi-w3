import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';

@Component({
    selector: 'rapi-w3-paginator',
    templateUrl: './w3-paginator.component.html',
    styleUrls: ['./w3-paginator.component.scss']
})
export class W3PaginatorComponent {

    @Input() pagination: any;
    @Output() onChange = new EventEmitter<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    changePage(event): void {
        this.onChange.emit(event);
    }
}
