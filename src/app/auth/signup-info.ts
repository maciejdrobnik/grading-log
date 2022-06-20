export class SignupInfo {

  username: string;
  firstname: string;
  lastname:string;
  role: string[];
  password: string;
  id: string;

  constructor(username: string, password: string, id: string,firstname: string, lastname:string) {
    this.username = username;
    this.role = ['user'];
    this.password = password;
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
