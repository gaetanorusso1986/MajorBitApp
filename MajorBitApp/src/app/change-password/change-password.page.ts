import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AlertUtil } from '../alertUtil';
import { LoaderUtil } from '../LoaderUtil';
import { User } from '../providers/user';
import { UserDetails } from '../Interfaces/UserData';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public userChange: UserDetails;
  error: any;
  constructor(
    public navCtrl: NavController,
    public user: User,
    public loadingCtrl: LoaderUtil,
    private alertUtil: AlertUtil,
    private router: Router
  ) {
    this.userChange = new UserDetails();
  }

  ngOnInit() {
  }
  changePassword(form: NgForm) {
    let details = this.userChange;

    if (
      !details.hasOwnProperty('oldPassword') &&
      !details.hasOwnProperty('newPassword') &&
      !details.hasOwnProperty('confirmPassword')
    ) {
      this.alertUtil.presentAlertError('Inserire la vecchia password');
      return false;
    }

    if (!details.hasOwnProperty('oldPassword')) {
      this.alertUtil.presentAlertError('Inserire la vecchia password');
      return false;
    }
    if (!details.hasOwnProperty('newPassword')) {
      this.alertUtil.presentAlertError('Inserire la nuova password');
      return false;
    }
    if (!details.hasOwnProperty('confirmPassword')) {
      this.alertUtil.presentAlertError('Inserire la conferma della password');
      return false;
    }

    if (details.newPassword != details.confirmPassword) {
      this.alertUtil.presentAlertError(
        'Password e Conferma Password devono coincidere.'
      );

      return false;
    }
    this.loadingCtrl.showHideAutoLoader();
    this.error = null;

    this.user
      .changePassword(details.oldPassword, details.newPassword)
      .then((result) => {
        debugger;
        this.loadingCtrl.hideLoader();
        this.alertUtil.presentAlert(
          'Password modificata con successo. Effettua il login'
        );
        this.user.logout();
        
         this.router.navigateByUrl('login');
      })
      .catch((err) => {
        this.loadingCtrl.hideLoader();
        if (err.message != '') {
          {
            console.log('error', err.message);

            this.alertUtil.presentAlertError(err.message);
          }
        }
      })
      .finally(() => {
        this.loadingCtrl.hideLoader();
      });
  }
  back() {
    this.navCtrl.navigateRoot('home');
  }



}
