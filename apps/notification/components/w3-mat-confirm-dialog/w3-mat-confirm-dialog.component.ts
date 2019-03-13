import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'rapi-w3-confirm-dialog',
    templateUrl: './w3-mat-confirm-dialog.component.html',
    styleUrls: ['./w3-mat-confirm-dialog.component.scss']
})
export class W3MatConfirmDialogComponent {
    public confirmMessage: string;
    public confirmTitle: string;
    public typeClass: string;

    constructor(public dialogRef: MatDialogRef<W3MatConfirmDialogComponent>) {
    }

}
