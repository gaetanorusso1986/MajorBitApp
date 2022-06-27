import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/providers/user';
import * as Constant from '../../constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  constructor( private userData: User,public router: Router) { }

  ngOnInit() {
    
    this.checkLoginStatus();
    this.listenForLoginEvents();
    
  }
  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });



    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }
  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }
  RedirectAccount(){

    this.router.navigateByUrl('/account');
  }
  SearchPage(){
this.router.navigateByUrl('/tabs/tab3');

  }
  AccountPage(){
    this.router.navigateByUrl(Constant.url+'account');
  }

  LoginPage(){
    this.router.navigateByUrl('tabs/login');

  }
}
