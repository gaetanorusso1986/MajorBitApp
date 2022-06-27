import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertUtil {
  private message: any;

  constructor(private alertCtrl: AlertController) {
    this.message = null;
  }
  presentAlertError(message) {
    this.alertCtrl
      .create({
        header: 'Attenzione',

        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }
  presentAlert(message) {
    this.alertCtrl
      .create({
        header: 'Notifica',
        message: message,
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }
  presentAlertErrorGeneric() {
    this.alertCtrl
      .create({
        header: 'Errore',
        message: "Si è verificato un errore, si prega di riprovare più tardi",
        buttons: ['OK'],
      })
      .then((res) => {
        res.present();
      });
  }
}
