import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {RapiPiecesConfirmDialogComponent} from '../../piece/components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class W3NotificationService {

    private _confirmDialogRef: MatDialogRef<RapiPiecesConfirmDialogComponent>;

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog, private _toast: ToastrService) {
    }

    notify(message: string, position: string = 'bottom', duration: number = 4000): void {

        setTimeout(() => {
            this.snackBar.dismiss();
        }, duration);

        this.snackBar.open(message);
    }

    info(message?: string, title?: string): void {
        this._toast.info(message, title);
    }

    error(message?: string, title?: string): void {
        this._toast.error(message, title);
    }

    success(message?: string, title?: string): void {
        this._toast.success(message, title);
    }

    warning(message?: string, title?: string): void {
        this._toast.warning(message, title);
    }

    confirmDeleteDialog(name = '', payload?: any): Observable<{ result: string, payload: any }> {
        return this.confirmDialog(`Deseja excluir o item ${name}?`, 'Excluir item', 'warn', payload);
    }

    confirmDialog(message: string, title: string, typeClass = 'warn', payload?: any): Observable<{ result: string, payload: any }> {
        this._confirmDialogRef = this.dialog.open(RapiPiecesConfirmDialogComponent, {
            disableClose: false
        });

        this._confirmDialogRef.componentInstance.confirmMessage = message;
        this._confirmDialogRef.componentInstance.confirmTitle = title;
        this._confirmDialogRef.componentInstance.typeClass = typeClass;

        return this._confirmDialogRef.afterClosed()
            .pipe(
                tap(() => this._confirmDialogRef = null),
                map(r => r ? {result: 'OK', payload} : {result: 'CANCEL', payload}),
            );
    }

    //
    // load(message = "Aguarde..."): Loading {
    //   let loading = this.loadingCtrl.create({
    //     content: message
    //   });
    //
    //   loading.present();
    //   return loading;
    // }

    // loadAsObservable(obs: Observable<any>, message = 'Aguarde...'): Observable<any> {
    //
    //   // let load = this.load(message);
    //
    //   return obs.pipe(
    //     // tap(() => load.dismiss()),
    //     catchError((error) => {
    //       // load.dismiss();
    //       return observableThrowError(error);
    //     })
    //   );
    //
    // }

}
