import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();


  constructor(private http: HttpClient) { }

  //current user : which is looged in 
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token 

  public generateToken(loginData:any)
  {
  
          return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user:set token in localstorage

  public loginUser(token:any)
  {

    localStorage.setItem("token" , token);
    return true;
  }

  //islogin :user is logged in or not

  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem("token")

    if(tokenStr == undefined || tokenStr =='' || tokenStr==null)
    {
      return false;
    }

    else
    {
      return true;
    }
  }

  //logout : remove token from local storage

  public logOut()
  {
    localStorage.removeItem('token');
    return true;
  }

  //get token

  public getToken()
  {
    return localStorage.getItem('token');
  }

  // set user details

  public setUser(user:any)
  {
    localStorage.setItem('user' , JSON.stringify(user));
  }

  //get user

  public getUser()
  {
    let userStr =localStorage.getItem("user");
    if(userStr != null)
    {
      return JSON.parse(userStr);
    }

    else
    {
      this.logOut();
      return null;
    }
  }


  //get user role

  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;

  }


}
