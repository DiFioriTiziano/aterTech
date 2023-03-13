import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ater-test',
  template: `
  <div class="animated fadeIn">
      test works!
  </div>
  `,
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { 
    console.log("sono dentro!");
  }

  ngOnInit(): void {
  }

}
