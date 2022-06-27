import { Allegato } from "./allegato";


export class ContenutoObject {
    from:number;
    count:number;
    IdStr: number;
    Data: string;
    Abilitato:number;
    Azienda:string;
    Contenuto:string;
    Groups:string;
    TipoAllegato:string;
    Tipologia:string;
    SottoCategoria:string;
    Titolo:string;
    Protetto:number
    Notizia:string;
    GruppoDestinatari:string;
    Categoria:string;
    allegati:Array<Allegato>
  }