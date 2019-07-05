import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";

import { ToastrService } from "ngx-toastr";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { W3ConfirmResponse } from "../../helpers/rxjs";
import { W3MatConfirmDialogComponent } from "./components/w3-mat-confirm-dialog/w3-mat-confirm-dialog.component";

/**
 * Serviço de notificações e alertas
 */
@Injectable()
export class W3NotificationService {
  private _confirmDialogRef: MatDialogRef<W3MatConfirmDialogComponent>;

  /**
   *
   * @param snackBar
   * @param dialog
   * @param _toast @see https://github.com/scttcper/ngx-toastr
   */
  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _toast: ToastrService
  ) {}

  /**
   * Notificação de snackbar
   */
  notify(
    message: string,
    position: string = "bottom",
    duration: number = 4000
  ): void {
    setTimeout(() => {
      this.snackBar.dismiss();
    }, duration);

    this.snackBar.open(message);
  }

  /**
   * Info toast
   */
  info(message?: string, title?: string): void {
    this._toast.info(message, title);
  }

  /**
   * Info error
   */
  error(message?: string, title?: string): void {
    this._toast.error(message, title);
  }

  /**
   * Info toast
   */
  success(message?: string, title?: string): void {
    this._toast.success(message, title);
  }

  /**
   * Warning toast
   */
  warning(message?: string, title?: string): void {
    this._toast.warning(message, title);
  }

  /**
   * Dialog Confirmação de deleção
   */
  confirmDeleteDialog(name = "", payload?: any): Observable<W3ConfirmResponse> {
    return this.confirmDialog(
      `Deseja excluir o item ${name}?`,
      "Excluir item",
      "warn",
      payload
    );
  }

  /**
   * Dialog Confirmação
   */
  confirmDialog(
    message: string,
    title: string,
    typeClass = "warn",
    payload?: any
  ): Observable<W3ConfirmResponse> {
    this._confirmDialogRef = this.dialog.open(W3MatConfirmDialogComponent, {
      disableClose: false
    });

    this._confirmDialogRef.componentInstance.confirmMessage = message;
    this._confirmDialogRef.componentInstance.confirmTitle = title;
    this._confirmDialogRef.componentInstance.typeClass = typeClass;

    return this._confirmDialogRef.afterClosed().pipe(
      tap(() => (this._confirmDialogRef = null)),
      map(r => (r ? { result: "OK", payload } : { result: "CANCEL", payload }))
    );
  }
}
