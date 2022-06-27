import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../Interfaces/configuration';
import { ConfigurationService } from '../../providers/configuration';
import { User } from '../../providers/user';
import * as Constant from '../../constants';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  loggedIn = false;
  public tabs: Array<IMenu>;
  constructor( private userData: User,public router: Router,public service: ConfigurationService) { }

  ngOnInit() {
    this.getMenu();
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }


  getMenu() {
    this.service
      .GetMenu()
      .then((result: Array<IMenu>) => {
    
        this.tabs = result
          .filter((obj) => obj.Ordine != null && obj.IsTab)
          .sort(function (a, b) {
            return a.Ordine - b.Ordine;
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
  goToParent(tipologia, gruppo){
   
    if (gruppo == 'Static' && tipologia.toUpperCase()!=Constant.HOME) {
      this.router.navigate([
        'tabs/details',
        tipologia,
        "",
        "",
        "",
      ]);
    }else{
    this.router.navigate(['tabs/single-page', tipologia]);
    }
  }
}
