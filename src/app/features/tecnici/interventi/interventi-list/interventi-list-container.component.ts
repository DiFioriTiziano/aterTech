import { Component, OnInit } from '@angular/core';
import { InterventiService } from '../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';


@Component({
  selector: 'ater-interventi-list-container',
  template: `

    <ater-data-tables [jobList]= "interventiList" ></ater-data-tables>
  `,
  styles: [
  ]
})
export class InterventiListContainerComponent implements OnInit {

  interventiList:any;


  constructor(private interventiService: InterventiService) { }

  ngOnInit(): void {
    let filter = {"matricola":""}
    this.interventiService.read(filter).subscribe( (res)=> this.interventiList = res.InterventiAter) ;
  }

}
