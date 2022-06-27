import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Constant from '../constants';

//import { Storage } from '@ionic/storage';
import { ContenutoObject } from '../Interfaces/ContenutoObject';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  TOKEN = 'Token';
  authorization: string;
  constructor(
    //    private storage: Storage,
    private user: User,
    public http: HttpClient
  ) {

  }

  GetMenu() {

    return new Promise((resolve, reject) => {
      /// this.user.getAuth().then((value) => {
      //  this.authorization = value;



      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('responseType', 'text');
      //.set('Authorization', this.authorization);

      let url = Constant.GETMENU;

      this.http.get(url, {
        headers: headers,
        observe: 'response',
      }).subscribe(
        (data) => {
          if (data.status == 200) {
            resolve(data.body);
          } else {
            reject({ message: data.statusText });
          }
        },
        (error) => {
          if (error != undefined) {

            reject({ message: error.error.body });
          } else {
            reject({ message: 'Si è verificato un errore' });
          }
          console.log('Catch error ');
        }
      );
      //  });
    });
  }


  GetContenuto(tipologia, categoria, sottocategoria, azienda, from) {

    return new Promise((resolve, reject) => {
     // this.user.getAuth().then((value) => {
        this.authorization = null;//value;
        let concaturl: string = "";


        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('responseType', 'text');
        //.set('Authorization', this.authorization);



        let url = Constant.GETCONTENUTI + "?tipologia=" + tipologia;

        if (categoria != "" && categoria != null) {
          concaturl = "&categoria=" + categoria;
        }
        if (sottocategoria != "" && sottocategoria != null) {
          concaturl += "&sottoCategoria=" + sottocategoria;
        }
        if (azienda != "" && azienda != null) {
          concaturl += "&azienda=" + azienda;
        }
        if (from != null) {
          concaturl += "&from=" + from;
        }
        //   concaturl+="&count=2";
        url += concaturl;



        this.http.get(url, {
          headers: headers,
          observe: 'response',
        }).subscribe(
          (data) => {
            if (data.status == 200) {
              resolve(data.body);
            } else {
              reject({ message: data.statusText });
            }
          },
          (error) => {
            if (error != undefined) {

              reject({ message: error.error.body });
            } else {
              reject({ message: 'Si è verificato un errore' });
            }
            console.log('Catch error ');
          }
        );
     // });
    });
  }
  GetSingleContenuto(id) {

    return new Promise((resolve, reject) => {
      // this.user.getAuth().then((value) => {
      this.authorization = null; //value;



      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('responseType', 'text');
      //.set('Authorization', this.authorization);

      let url = Constant.GETCONTENUTI + "?idStr=" + id;

      this.http.get(url, {
        headers: headers,
        observe: 'response',
      }).subscribe(
        (data) => {
          if (data.status == 200) {
            resolve(data.body);
          } else {
            reject({ message: data.statusText });
          }
        },
        (error) => {
          if (error != undefined) {

            reject({ message: error.error.body });
          } else {
            reject({ message: 'Si è verificato un errore' });
          }
          console.log('Catch error ');
        }
      );
      // });
    });
  }

  SearchContenuto(search) {

    return new Promise((resolve, reject) => {
     // this.user.getAuth().then((value) => {
       // this.authorization = value;



        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('responseType', 'text');
        //.set('Authorization', this.authorization);

        let url = Constant.GETCONTENUTI + "?search=" + search;

        this.http.get(url, {
          headers: headers,
          observe: 'response',
        }).subscribe(
          (data) => {
            if (data.status == 200) {
              resolve(data.body);
            } else {
              reject({ message: data.statusText });
            }
          },
          (error) => {
            if (error != undefined) {

              reject({ message: error.error.body });
            } else {
              reject({ message: 'Si è verificato un errore' });
            }
            console.log('Catch error ');
          }
        );
     // });
    });
  }

  GetAllegato(fileName, email) {

    return new Promise(async (resolve, reject) => {

    //  this.authorization = await this.getTokenAuthorization();
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('responseType', 'text')
        .set('Authorization', this.authorization);
      let url = Constant.GETALLEGATO + "?fileName=" + fileName + "&email=" + email;

      this.http.get(url, {
        headers: headers,
        observe: 'response',
      }).subscribe(
        (data) => {
          if (data.status == 200) {
            resolve(data.body);
          } else {
            reject({ message: data.statusText });
          }
        },
        (error) => {
          if (error != undefined) {

            reject({ message: error.error.body });
          } else {
            reject({ message: 'Si è verificato un errore' });
          }
          console.log('Catch error ');
        }
      );
    });

  }

  async getTokenAuthorization() {
    // return await this.user.getAuth().then((value) => {
    //   return value;
    // });
  }
}
