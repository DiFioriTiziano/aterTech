import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth/auth.service';

@Component({
  selector: 'ater-container-login',
  template: `
  <div class="animated fadeIn">
        <ater-login></ater-login>
  </div>
  `,
  styles: [
  ]
})
export class ContainerLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.apiLogin().subscribe( ()=> console.log ) ;
  }



}
