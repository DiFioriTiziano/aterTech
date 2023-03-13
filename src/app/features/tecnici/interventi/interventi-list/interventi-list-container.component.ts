import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ater-interventi-list-container',
  template: `

    <ater-data-tables></ater-data-tables>
  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
