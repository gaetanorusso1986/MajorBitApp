import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Constant from '../constants';

import { Storage } from '@ionic/storage';

import { UserLogged } from '../Interfaces/UserData';


@Injectable({
  providedIn: 'root'
})
export class User {
  private authorization: any;
  private user: any;
  HAS_LOGGED_IN = 'hasLoggedIn';
  USERLOGGED = 'UserLogged';
  TOKEN = 'Token';
  constructor(public http: HttpClient,
    public storage: Storage
  ) { }

  getUser() {

    return this.storage.get(this.USERLOGGED).then((value) => {
      this.user = value;
      return value;
    });

  }
  getUsernameDirect() {
    return this.user.users[0].firstName;
  }
  getUserId() {

    if (this.user == undefined) {
      this.getUser().then((value) => {
        return this.user.users[0].userId;
      })
    }
    else {
      return this.user.users[0].userId;
    }
  }
  getUserTest() {
    return new Promise((resolve, reject) => {

      resolve(this.storage.get(this.USERLOGGED));
    });
  }
  getAuth() {
    return this.storage.get(this.TOKEN).then((value) => {
      return value;
    });
  }
  login(username, password, usercode) {


    return new Promise((resolve, reject) => {

      var user = {
        'username': username,
        'password': password,
        'idUserOs': usercode
      }
      var params = user;

      const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('responseType', 'text')

      this.http.post(Constant.LOGIN, params,
        {
          headers: headers, observe: 'response'
        }).subscribe(data => {

          if (data.status == 200) {
            this.authorization = data.headers.get("Authorization");

            this.user = data.body;

            this.storage.set(this.USERLOGGED, this.user);

            this.storage.set(this.TOKEN, this.authorization);
            this.storage.set(this.HAS_LOGGED_IN, true);
            this.setUsername(this.user.users[0].firstName);
            window.dispatchEvent(new CustomEvent('user:login'));
            resolve(data);

          }
          else {
            reject(data);
          }
        }, (error) => {
          if (error != undefined) { reject({ message: error }); }
          else {
            reject({ message: "Si è verificato un errore" });
          }
          console.log("Catch error ")
        });

    });
  }

  logout(): Promise<any> {
    this.user = null;
    this.authorization = null;
    this.storage.remove(this.USERLOGGED);
    this.storage.remove(this.TOKEN);
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  changePassword(oldPassword, newPassword) {

    return this.getUser().then((result: UserLogged) => {
      this.user = result;
      return this.getAuth().then((auth) => {
        this.authorization = auth;





        return new Promise((resolve, reject) => {
          var user = {
            "userId": this.user.userId,
            "username": this.user.users[0].email,
            "passwordAttuale": oldPassword,
            "nuovaPassword": newPassword,
            "ripetiNuovaPassword": newPassword
          };

          var params = user;


          const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('responseType', 'text')
            .set('Authorization', this.authorization);

          this.http.post(Constant.CHANGE_PASSWORD, params,
            {
              headers: headers, observe: 'response'
            }).subscribe(data => {

              if (data.status == 200) {
                return this.logout().then(() => {
                  resolve(data);
                });
              } else {
                reject({ message: data.statusText });
              }
            }, (error) => {
              if (error != undefined) {
                //error.error.body
                reject({ message: error.error.body });
              }
              else {
                reject({ message: "Si è verificato un errore" });
              }
              console.log("Catch error ")
            });
        });
      });
    });
  }
  recovery(email) {

 

    return new Promise((resolve, reject) => {
      var user = {
        'Email': email
      };
      var params = user;
      console.log(params);
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      headers.append('Authorization', this.authorization);
      this.http.post(Constant.RECOVERY,
        params, {
        headers: headers, observe: 'response'
      })

        .subscribe(data => {
          if (data.status == 200) {
            this.user = data;
            resolve(this.user);
          } else {
            reject({ message: data.statusText });
          }
        });
    });
  }
  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
 
  }
  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  async getUserCode() {

    return await this.storage.get('userId').then((value) => {
      return value;
    });
  }

  getAnagraficaUtente() {
    return new Promise((resolve, reject) => {
      this.getAuth().then((value) => {
        this.authorization = value;
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('responseType', 'text')
          .set('Authorization', this.authorization);

        let username = this.getUserId();
        let url = Constant.GETUTENTI + "?username=" + username;
        this.http.get(url,
          {
            headers: headers, observe: 'response'
          }).subscribe(data => {
            if (data.status == 200) {

              let result = data.body[0];

              resolve(result);
            } else {
              reject({ message: data.statusText });
            }
          }, (error) => {
            if (error != undefined) {
             
              reject({ message: error.error.body });
            }
            else {
              reject({ message: "Si è verificato un errore" });
            }
            console.log("Catch error ")
          });

      });
    });
  }
}