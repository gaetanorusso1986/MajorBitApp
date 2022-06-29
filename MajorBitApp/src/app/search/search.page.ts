import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertUtil } from '../alertUtil';
import {ConfigurationService} from '../providers/configuration';
import { LoaderUtil } from 'src/app/LoaderUtil';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  search:string="";
  resultList:[];
  constructor(private config:ConfigurationService,
    public loadingCtrl: LoaderUtil,private router: Router, private alertUtil: AlertUtil,) {}

  ngOnInit() {
  }

  onInput(value:string)
  {

  if(value.trim() !="" && value.trim().length >= 3)
  {

   this.search=value.trim();
  this.config.SearchContenuto(this.search).then((result:[])=>{
   
   this.resultList= result;


  }).catch(()=>{
   
    this.alertUtil.presentAlertError(
      'Si è verificato un errore, si prega di riprovare più tardi'
    );
  })
}
else{

  this.resultList=[];
}
  
}
Details(idStr) {

  this.router.navigate(['app/tabs/details/' + idStr]);
}

}
