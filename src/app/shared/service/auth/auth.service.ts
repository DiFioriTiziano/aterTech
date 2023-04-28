import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUser : object;
  isLoginSubject = new BehaviorSubject<boolean>( this.hasToken() );




  constructor( private http_client:HttpClient, private router: Router ) { }

// *********************** Gestione Auth API *******************************
    apiLogin() {
      this.apiUser =  {
        "user": environment.api_user,
        "password": environment.api_password
      }

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/auth/login`,  this.apiUser).pipe(
          tap(res =>  {
            this.setApiSession(res,environment.api_user)
            } ),
            shareReplay()
      )
    }


    apiLogout() {
      localStorage.removeItem('user');
      localStorage.removeItem('api_token');
     // this.router.navigate(['/login']);
    // window.location.href =  '/apidocs';
    }


      private setApiSession(authResult, user) {
        localStorage.setItem('api_token', authResult.token);
        localStorage.setItem('user', user);
      }


        refreshApiToken(): Observable<string> {
          console.log("mi hai chiamata? sn in refresh!")
          return  this.apiLogin()
        }

// *********************** FINE Gestione Auth API *******************************




    isLoggedIn() : Observable<boolean> {
      return this.isLoginSubject.asObservable();
    }


    login(dataForm) : void {

      if (dataForm.user === 'tdifiori' && dataForm.password === 'tdifiori'){

          localStorage.setItem('userLogin', dataForm.user);
          this.isLoginSubject.next(true);
          this.router.navigate(['/dashboard']);
      }

    }

    logout() : void {
      localStorage.removeItem('userLogin');
      this.isLoginSubject.next(false);
    }

    private hasToken() : boolean {
      return !!localStorage.getItem('userLogin');
    }


}


