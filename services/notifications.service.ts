import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class W3NotificationService {

    constructor(public snackBar: MatSnackBar, private _toast: ToastrService) {
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
