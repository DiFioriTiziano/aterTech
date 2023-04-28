import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth/auth.service';
import { User } from '../tecnici/interventi/model/user.model';

@Component({
  selector: 'ater-container-login',
  template: `
  <div class="animated fadeIn">
        <ater-login (auth)="login($event)"></ater-login>
  </div>
  `,
  styles: [
  ]
})
export class ContainerLoginComponent implements OnInit {
  @Input('auth') auth:User

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.apiLogin().subscribe( ()=> console.log ) ;
  }


  login(dataForm){
    //console.log("container-login", dataForm)
    this.authService.login(dataForm)
       // this.router.navigateByUrl('/dashboard')
  }

}
