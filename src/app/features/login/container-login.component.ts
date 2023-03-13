import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
