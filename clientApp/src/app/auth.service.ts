import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { personData } from './interfece';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Enviorment variables
  readonly server : string = environment.apiURL;

  constructor(private cookie : CookieService,private http : HttpClient) {}

  // Person state observable
  private readonly _person = new BehaviorSubject<personData>({
    username : "",
    first_name : "",
    last_name : ""
  });
  readonly user$ = this._person.asObservable();

  // is user Data reterival in Progress
  _inProg = new BehaviorSubject<boolean>(false);
  InProg$ = this._inProg.asObservable();

  // State for logged in or not
  readonly _loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this._loggedIn.asObservable();
  get loggedIn() : boolean {
    return this._loggedIn.getValue();
  }

  get person(): personData {
    return this._person.getValue();
  }

  private set person(val: personData) {
    this._person.next(val);
  }

  // Service that calls api to register user
  register(user: string, pass: string, first : string, last : string) {
    let temp = {
      username: user,
      password: pass,
      first_name: first,
      last_name: last
    }

    return this.http.post(this.server+'/api/auth/register/',temp)
    .pipe (
      tap (
        data => {
          this.login(user,pass).subscribe((res : any)=>{})
        },
        error => console.log(error)
      )
    )
  }

  // Service that loads based on cookies
  checkUser() {
    let temp = this.cookie.get('cookie')
    if (temp)
    {
      this._inProg.next(true);
      let header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Bearer ${this.cookie.get('cookie')}`)
      }
      this.http.get(this.server+'/api/auth/profile/',header).toPromise()
      .then((res : any)=>{
        let userData = res
        let temp : personData = {
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name
        }
        this.person = temp
        this._loggedIn.next(true);
        this._inProg.next(false);
      })
      .catch(err =>{
        console.log(err)
        this.cookie.delete('cookie')
        this._loggedIn.next(false);
        this._inProg.next(false);
      })
    
      this._loggedIn.next(true);
      this._inProg.next(false);
    }
    else
    {
      this._inProg.next(false);
      this._loggedIn.next(false);
      this.person = {
        username : "",
        first_name : "",
        last_name : ""
      }
    }
  }

  // api calls to login and get token
  login(uid : string,pass : string)
  {
    let temp = {
    username : uid,
    password : pass
    }
    return this.http.post(this.server+'/api/auth/login/',temp)
    .pipe(
      tap (
        data =>{
          let token : any = data
          this.cookie.set('cookie',token.access)
          this.checkUser()
        },
        error => console.log(error)
      )
    )
  }

  // deletes the cookie and logs user out
  logout()
  {
    this.cookie.delete('cookie')
    this.cookie.deleteAll('/', 'localhost');
    this.checkUser()
  }

  searchUsers(to_search : string) {
    return this.http.get(this.server+'/api/auth/findusers/'+to_search)
  }

  // Gets all the headers
  getHeader()
  {
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.cookie.get('cookie')}`)
    }
  }
}