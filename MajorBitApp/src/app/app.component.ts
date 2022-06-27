import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
//const { SplashScreen } = Plugins;
import { Storage } from '@ionic/storage';
import { User } from '../app/providers/user';
import { Router } from '@angular/router';
import { ConfigurationService } from '../app/providers/configuration';
import { IMenu } from './Interfaces/configuration';
import * as Constant from '../app/constants';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public username: string = '';
  showLevel1 = null;
  showLevel2 = null;
  showLevel3 = null;

  loggedIn = false;
  public appPages: Array<IMenu>;
  constructor(
    //private oneSignal: OneSignal,
    private platform: Platform,
  private storage: Storage,
    public service: ConfigurationService,
    private menu: MenuController,
    private userData: User,
    public router: Router
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        //this.setupPush();
      }     
    });

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change",(mediaQuery) => toggleDarkTheme(mediaQuery.matches));



    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle('dark', shouldAdd);
    }
    this.initializeApp();

  }

  initializeApp() {
 
    this.storage.clear();
    //SplashScreen.hide();
   
    this.listenForLoginEvents();
    this.getUsername();
    this.getMenu();
  } 

 /* setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(
      '1fa1ee70-d604-4c63-8f55-9a34d0b2cf9c',
      '1047419189274'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
     
      // this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;
     
      //this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

  

    this.oneSignal.endInit();
      this.oneSignal.getIds().then(identity => {
        this.storage.set('userId', identity.userId);
        console.log(identity.userId + " It's Devices ID");
    });
  }*/
  ngOnInit() {
    const path = window.location.pathname.split('/')[1];

    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(
    //     (page) => page.Nome.toLowerCase() === path.toLowerCase()
    //   );
    // }
    //this.checkLoginStatus().then((value) => {});
  

   this.router.navigateByUrl('/tabs');
  }
  checkLoginStatus() {
    return this.userData.isLoggedIn().then((loggedIn) => {
      this.updateLoggedInStatus(loggedIn);
      // if (loggedIn) {
     // return this.router.navigateByUrl('/app/tabs');
      // }
    });
  }
  listenForLoginEvents() {
    
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:login', () => {
      let users = this.userData.getUsernameDirect();
      this.username = users;
      this.getMenu();
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }
  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/tabs');
    });
  }

  getUsername() {
    // this.userData.getUsername().then((username) => {
    //   this.username = username;
    //   console.log('Username is: ' + this.username);
    // });
  }
  getMenu() {
   
    this.service
      .GetMenu()
      .then((result: Array<IMenu>) => {
        this.appPages = result
          .filter((obj) => obj.Ordine != null)
          .sort(function (a, b) {
            return a.Ordine - b.Ordine;
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  isLevel3Shown(idx: string) {
    return this.showLevel3 === idx;
  }
  toggleLevel3(idx: string) {
    if (this.isLevel3Shown(idx)) {
      this.showLevel3 = null;
    } else {
      this.showLevel2 = idx;
      this.showLevel3 = idx;
    }
  }
  isLevel2Shown(idx: string) {
    return this.showLevel2 === idx;
  }
  toggleLevel2(
    idx: string,
    tipologia: string,
    categoria: string,
    sottocategoria: string,
    azienda: string,
    pageType: string
  ) {
    this.menu.close();
    this.showLevel2 = null;
    let cat = categoria == null ? '' : categoria;
    let sottocat = sottocategoria == null ? '' : sottocategoria;
    let societa = azienda == null ? '' : azienda;

    this.router.navigate(['/single-page', tipologia, cat, sottocat, societa]);
  }
  isLevel1Shown(idx: string) {
    return this.showLevel1 === idx;
  }
  toggleLevel1(idx: string) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel2 = null;
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  }
  toggleLevel7(idx: string) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel2 = null;
    } else {
      //this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  }
  clearLevel() {
    this.showLevel1 = null;
    this.showLevel2 = null;
    this.showLevel3 = null;
  }

  redirect_page(
    tipologia,
    categoria,
    sottoCategoria,
    azienda,
    pageType,
    gruppo
  ) {
    this.menu.close();
      let cat = categoria == null ? '' : categoria;
        let sottocat = sottoCategoria == null ? '' : sottoCategoria;
        let societa = azienda == null ? '' : azienda;
   
    switch (pageType) {
      case Constant.TESSERA:
        this.router.navigateByUrl('/tessera');
        break;
      case Constant.PROFILE:
        this.router.navigateByUrl('/tabs/account');
        break;

      default:
      
        if (gruppo == 'Static' && tipologia.toUpperCase()!=Constant.HOME) {
          this.router.navigate([
            'tabs/details',
            tipologia,
            cat,
            sottocat,
            societa,
          ]);
        } else {
          this.router.navigate([
            'tabs/single-page',
            tipologia,
            cat,
            sottocat,
            societa,
          ]);
        }
        break;
    }
  }
}
