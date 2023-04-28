import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../tecnici/interventi/model/user.model';

@Component({
  selector: 'ater-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{ provide: AlertConfig }]
})
export class LoginComponent implements OnInit {
  @Output('auth') auth : EventEmitter<User> = new EventEmitter<User>()

  FormLogin: FormGroup;



  constructor(
    private router:Router,
    private fb:FormBuilder
    ) { }



  ngOnInit(): void {

    this.FormLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }




  login(dataForm){
      this.auth.emit(dataForm)
  }

}
