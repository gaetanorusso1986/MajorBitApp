import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../providers/configuration';
import { Router } from '@angular/router';
import { LoaderUtil } from 'src/app/LoaderUtil';
import { AlertUtil } from 'src/app/alertUtil';
//import { File } from '@ionic-native/file/ngx';
//import {
// FileTransfer,
// FileTransferObject,
//} from '@ionic-native/file-transfer/ngx';
//import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.page.html',
  styleUrls: ['./generic.page.scss'],
})
export class GenericPage implements OnInit {

  //fileTransfer: FileTransferObject;
  id = null;
  listHome: Array<any> = [];
  isHome: boolean = false;
  tipologia: string;
  categoria: string;
  azienda: string;
  sottocategoria: string;
  public result: [];
  public tipologiaAllegato;
  private from: number;
  myCustomIcon = 'assets/icon/pdf_1.svg';
  constructor(
    private activateRoute: ActivatedRoute,
    public loadingCtrl: LoaderUtil,
    private alertUtil: AlertUtil,
    private config: ConfigurationService,
    private router: Router,
    //private fileOpener: FileOpener,
    //private transfer: FileTransfer,
   // private file: File
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    debugger;
    //this.loadingCtrl.showLoader();
    this.from = 1;
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.tipologia = this.activateRoute.snapshot.paramMap.get('tipologia');
    this.categoria = this.activateRoute.snapshot.paramMap.get('categoria');
    this.sottocategoria =
      this.activateRoute.snapshot.paramMap.get('sottocategoria');
    this.azienda = this.activateRoute.snapshot.paramMap.get('azienda');
    if (this.id == null && this.tipologia == null) {
      this.isHome = true;
      this.getlistContenuti(
        'home',
        this.categoria,
        this.sottocategoria,
        this.azienda
      );
    } else {
      this.isHome = false;
      this.getlistContenuti(
        this.tipologia,
        this.categoria,
        this.sottocategoria,
        this.azienda
      );
    }
  }

  getlistContenuti(tipologia, categoria, sottocategoria, azienda) {
    //this.loadingCtrl.showHideAutoLoader();

    this.result = null;
    this.listHome = null;
    this.from = 1;
    this.config
      .GetContenuto(tipologia, categoria, sottocategoria, azienda, this.from)
      .then((_result: []) => {


        this.tipologia = tipologia;
        this.categoria = categoria;
        this.sottocategoria = sottocategoria;
        this.azienda = azienda;
        if (_result != null && _result.length > 0) {
          if (tipologia.toUpperCase() == 'HOME') {

            this.result = null;
            this.listHome = _result;
          } else {
            this.listHome = null;
            this.result = this.groupByType(_result, 'Tipologia');
            this.getTipoAllegato(_result, 'TipoAllegato');
          }
        } else {
          this.alertUtil.presentAlertError(
            'Pagina in costruzione si prega di riprovare più tardi'
          );
        }

        this.loadingCtrl.loadingController.dismiss();
      })
      .catch((err) => {
        console.log(err);
        this.loadingCtrl.loadingController.dismiss();
        this.alertUtil.presentAlertErrorGeneric();
      });
  }

  getlistContenutiPagination(tipologia, categoria, sottocategoria, azienda) {
    //this.loadingCtrl.showHideAutoLoader();

    this.result = null;
    // this.listHome = null;

    this.config
      .GetContenuto(tipologia, categoria, sottocategoria, azienda, this.from)
      .then((_result: []) => {

        this.tipologia = tipologia;
        this.categoria = categoria;
        this.sottocategoria = sottocategoria;
        this.azienda = azienda;
        if (_result != null && _result.length > 0) {
          if (tipologia.toUpperCase() == 'HOME') {
            this.result = null;
            this.listHome = _result;
          } else {
            this.listHome = null;
            this.result = this.groupByType(_result, 'Tipologia');
            this.getTipoAllegato(_result, 'TipoAllegato');
          }
        } else {
          /* this.alertUtil.presentAlertError(
             'Pagina in costruzione si prega di riprovare più tardi'
           );*/
        }
        //    this.loadingCtrl.hideLoader();
      })
      .catch((err) => {
        console.log(err);
        // this.loadingCtrl.hideLoader();
        this.alertUtil.presentAlertErrorGeneric();
      });
  }
  Details(idStr) {

    this.router.navigate(['app/tabs/details/' + idStr]);
  }


  groupByType(array, property) {
    return array.reduce((r, a) => {
      const val = a[property];
      r[val] = r[val] || [];
      r[val].push(a);
      return r;
    }, Object.create(null));
  }
  getTipoAllegato(array, property) {
    array.reduce((r, a) => {
      // this.tipologiaAllegato = a[property];
      this.tipologiaAllegato = 'pdf';
    }, Object.create(null));
  }
  doRefresh(event) {
    this.from = 1;

    this.getlistContenuti(
      this.tipologia,
      this.categoria,
      this.sottocategoria,
      this.azienda
    );
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  doInfinite(infiniteScroll: any) {

    this.from++;
    setTimeout(() => {
      console.log(this.from);
      this.getlistContenutiPagination(this.tipologia, this.categoria, this.sottocategoria, this.azienda);
      infiniteScroll.target.disabled = true;
      // if (infiniteScroll){ 
      //   infiniteScroll.target.complete();}
    }, 500);
  }



  groupBy(array, f) {
    let groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }
  saveAndOpenPdf(contenuto) {
    /* var filename = 'helloWorld.pdf';
     var myBase64 =
       'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
 
     const writeDirectory = this.file.externalDataDirectory;
     this.file
       .writeFile(
         writeDirectory,
         filename,
         this.convertBase64ToBlob(myBase64, 'data:application/pdf;base64'),
         { replace: true }
       )
       .then(() => {
         this.fileOpener
           .open(writeDirectory + filename, 'application/pdf')
           .catch(() => {
             console.log('Error opening pdf file');
           });
       })
       .catch(() => {
         console.error('Error writing pdf file');
       });*/
  }
  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

}
