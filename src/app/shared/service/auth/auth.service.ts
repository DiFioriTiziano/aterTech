import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUser : object;

  constructor( private http_client:HttpClient ) { }


    apiLogin() {
      this.apiUser =  {
        "user": environment.api_user,
        "password": environment.api_password
      }

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/auth/login`,  this.apiUser).pipe(
          tap(res =>  {
            this.setSession(res,environment.api_user)
            } ),
            shareReplay()
      )
    }


    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('id_token');
     // this.router.navigate(['/login']);
    // window.location.href =  '/apidocs';
    }


    private setSession(authResult, user) {
      localStorage.setItem('id_token', authResult.token);
      localStorage.setItem('user', user);
    }


//  ------  GESTIONE TOKEN  ---------------------------

refreshToken(): Observable<string> {
  console.log("mi hai chiamata? sn in refresh!")
  return  this.apiLogin()
}



// -------------------------------------------------------------








}


