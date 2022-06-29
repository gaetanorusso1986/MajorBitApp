import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../providers/user';
import { UserLogin } from '../interfaces/UserData';
import { AlertUtil } from '../alertUtil';
import { LoaderUtil } from '../LoaderUtil';
import * as Constant from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: UserLogin = { username: '', password: '', showPassword: false };
  submitted = false;
  isActiveToggleTextPassword: Boolean = true;
  constructor(public router: Router, public userData: User, public loadingCtrl: LoaderUtil, private alertUtil: AlertUtil) {
    this.login = new UserLogin();
  }

  ngOnInit() {
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    this.loadingCtrl.showHideAutoLoader();
    if (form.valid) {

      var usercode = await this.userData.getUserCode();

      this.userData.login(this.login.username, this.login.password, usercode).then((result) => {
        this.loadingCtrl.hideLoader();
        
        this.router.navigateByUrl(Constant.url + 'generic');

      }).catch((err) => {

        if (err != "") {
          this.loadingCtrl.hideLoader();
          this.alertUtil.presentAlertError(err.message.error);
          console.log('error', err);


        }
      });

    }
  }
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  Open() {
    var ref = window.open('http://apache.org', '_system', 'location=yes');
  }

}
