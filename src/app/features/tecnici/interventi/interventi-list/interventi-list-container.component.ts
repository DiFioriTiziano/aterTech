import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { InterventiService } from '../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';


@Component({
  selector: 'ater-interventi-list-container',
  template: `

    <div class="card">
      <div class="card-body">
      <ater-interventi-create-modal></ater-interventi-create-modal>
      </div>
    </div>

    <ater-data-tables *ngIf="interventiList" [jobList]= "interventiList" ></ater-data-tables>
  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  interventiList:any;


  constructor(private interventiService: InterventiService) { }

  ngOnInit(): void {
    let filter = {"matricola":""}
    this.interventiService.read(filter).subscribe( (res)=> this.interventiList = res.InterventiAter);
  }
// .subscribe( (res)=> this.interventiList = res.InterventiAter)
}
