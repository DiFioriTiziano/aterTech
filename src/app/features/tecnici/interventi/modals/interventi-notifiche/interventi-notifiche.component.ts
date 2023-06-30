import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ater-interventi-notifiche',
  template: `

    <alert class="alert-container animated fadeIn"   role="alert" [type]='type' [dismissible]="true">
      <span>Dato aggiornato correttamente !</span>
    </alert>

  `,
  styles: [`
    .alert-container {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  `
  ]
})
export class InterventiNotificheComponent implements OnInit {

  constructor() { }

  type : string = "success"

  ngOnInit(): void {
  }

}
