import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class W3NotificationService {

    constructor(public snackBar: MatSnackBar) {
    }

    notify(message: string, position: string = 'bottom', duration: number = 4000): void {

        setTimeout(() => {
            this.snackBar.dismiss();
        }, duration);

        this.snackBar.open(message);
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
