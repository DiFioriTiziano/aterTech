import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ater-interventi-valida-list-container',
  template: `
  <div class="animated fadeIn">
    <ater-interventi-valida-list></ater-interventi-valida-list>
  </div>
  `,
  styles: [
  ]
})
export class InterventiValidaListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
