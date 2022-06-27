export class UserLogin {
    username: string;
    password: string;
    showPassword:boolean;
  }
  export class  UserDetails {
    companyName:string;
    email:string;
    firstName:string;
    idCompany:number;
    lastName:String;
    token:string;
    userId:string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;    
}
export class  UserLogged {
  userId:number;
  users:UserDetails;
}
