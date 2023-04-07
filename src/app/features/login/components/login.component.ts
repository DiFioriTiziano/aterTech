import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'ater-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{ provide: AlertConfig }]
})
export class LoginComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  login(){
    this.router.navigateByUrl('/dashboard')
  }

}
