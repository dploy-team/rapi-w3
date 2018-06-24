import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar
    // private toastCtrl: ToastController,
    // private loadingCtrl: LoadingController
  ) {
  }

  notify(message: string, position: string = 'bottom', duration: number = 3500) {
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 4000);
    return this.snackBar.open(message);
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
