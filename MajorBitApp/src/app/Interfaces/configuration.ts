export class IMenu {
    IdStr:number;
    Tipologia: string;
    URLService: string;
    APPIcon:boolean;
    Ordine:number;
    Nome:string;
    Abilitato:boolean
    show:boolean=false;
    Children:Array<IMenu>;
    IsTab:boolean=false;
    IsSideMenu:boolean=false;
    
  }