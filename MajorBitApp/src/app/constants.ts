/** API CONSTANTS **/
export const API_ENDPOINT = "https://intranet.majorbit.com/";
export const API_MICRO ="http://87.27.146.120:54421/api/";
/** USER **/
export const USER_SERVICE = API_ENDPOINT + "ms/auth/utenti/";
export const LOGIN = USER_SERVICE + "accesso";
export const CHANGE_PASSWORD = USER_SERVICE + "change_password";
export const RECOVERY = USER_SERVICE + "";

/** NEWS **/

export const NEWS_SERVICE=API_ENDPOINT+"ms/uilcom/";
export const GETALL_NEWS=NEWS_SERVICE+"news/";

/** COMUNICATI **/
export const COMUNICATI_SERVICE=API_ENDPOINT+"ms/uilcom/";
export const GETALL_COMUNICATI=COMUNICATI_SERVICE+"comunicati_sindacali/";

/* CONSTANTI */
export const url='/app/tabs/';


/** CONFIGURAZIONI **/
export const MENU_SERVICE=API_ENDPOINT+"ms/uilcom/";
export const GETMENU=MENU_SERVICE+ "sezioni_servizi/";



/** CONTENUTI **/
export const CONTENUTI_SERVICE=API_ENDPOINT+"ms/uilcom/";
export const GETCONTENUTI=CONTENUTI_SERVICE+ "contenuti/";

export const GETALLEGATO=CONTENUTI_SERVICE+"allegato/"

/** ANAGRAFICA UTENTI **/
export const ANAGRAFICA_SERVICE=API_ENDPOINT+"ms/uilcom/";
export const GETUTENTI=ANAGRAFICA_SERVICE+ "anagrafica_iscritti/"

/** GESTIONE PAGINE **/
export const TESSERA = "card";
export const PROFILE= "profile";
export const HOME= "HOME";



/** MICROSERVIZIO**/
export const INSERTUSER=API_MICRO+"InsertUser";
export const UPDATEUSER=API_MICRO+"UpdateUser";