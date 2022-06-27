import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderUtil {
    private message: any;

  constructor(  public loadingController: LoadingController) {   
      this.message = null;
  }
  showHideAutoLoader() {

    this.loadingController.create({
      message: 'Attendere prego...',
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }
  showLoader() {

    this.loadingController.create({
      message: 'Attendere prego...'
    }).then((res) => {
      res.present();
    });

  }
 
 hideLoader() {

  this.loadingController.dismiss();
    // this.loadingController.dismiss().then((res) => {
    //   console.log('Loading dismissed!', res);
    // }).catch((error) => {
    //   console.log('error', error);
    // });

  }
}