import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

/**
 * Dialog para confirmação simples
 *
 * @example
 * const confirmDialogRef = this.dialog.open(W3MatConfirmDialogComponent, {
 *               disableClose: false
 * });
 *
 * confirmDialogRef.componentInstance.confirmMessage = message;
 * confirmDialogRef.componentInstance.confirmTitle = title;
 * confirmDialogRef.componentInstance.typeClass = typeClass;
 *
 * confirmDialogRef.afterClosed().pipe(
 *               tap((result) => {
 *                  if (result)
 *                      //Accepted
 *                  else
 *                      //Not accepted
 *               },
 *  );
 */
@Component({
  selector: "rapi-w3-confirm-dialog",
  templateUrl: "./w3-mat-confirm-dialog.component.html",
  styleUrls: ["./w3-mat-confirm-dialog.component.scss"]
})
export class W3MatConfirmDialogComponent {
  public confirmMessage: string;
  public confirmTitle: string;
  public typeClass: string;

  constructor(public dialogRef: MatDialogRef<W3MatConfirmDialogComponent>) {}
}
