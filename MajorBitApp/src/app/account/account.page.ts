import { Component, OnInit } from '@angular/core';
import { User } from '../providers/user';
import { UserLogged } from '../Interfaces/UserData';
import { Router } from '@angular/router';
import { LoaderUtil } from 'src/app/LoaderUtil';
import * as Constant from '../constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public userload: any;
  loggedIn = false;
  constructor(
    private user: User,
    public router: Router,
    public loadingCtrl: LoaderUtil) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.checkLoginStatus().then(() => {
    
      if (!this.loggedIn) {
        this.router.navigateByUrl('/tabs/login');
      } else {
        this.userload = new UserLogged();
        this.loadUser();
      }
    });
  }

  checkLoginStatus() {
    return this.user.isLoggedIn().then((loggedIn) => {
      this.updateLoggedInStatus(loggedIn);
    
      this.loggedIn = loggedIn;
      
    });
  }
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }
  loadUser() {
    this.user.getUser().then((result: UserLogged) => {
      this.userload = result.users[0];
    });
  }
  changePassword() {
    this.router.navigateByUrl(Constant.url + 'change-password');
  }
  logout() {
    this.loadingCtrl.showHideAutoLoader();
    this.user.logout().then(() => {
      return this.router.navigateByUrl('');
    });
  }

}
