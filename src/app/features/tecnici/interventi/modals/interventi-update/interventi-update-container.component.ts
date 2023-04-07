import { Component, Input, OnInit } from '@angular/core';
import { InterventiService } from '../../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';

@Component({
  selector: 'ater-interventi-update-container',
  template: `
        <ater-interventi-update
          *ngIf="data"
          [title]="title"
          [dati]="data"
          [tipologie]="tipologie"
          (datiModificati)="interventoModificato($event)"
        >
      </ater-interventi-update>
  `,
  styles: [
  ]
})
export class InterventiUpdateContainerComponent implements OnInit {

  tipologie: any

  // initialState modale
  data:any
  title:any

  constructor(
      private interventiService: InterventiService,
  ) { }

  ngOnInit(): void {
    //recupera tipologie interventi
    this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
   }


   interventoModificato(datiModificati){
    console.log(datiModificati)
     this.interventiService.update(datiModificati).subscribe( (res) =>
    {
      // this.obj = '';
      this.interventiService.emitDataUpdated();
      },
      (error) => {
        console.error(error);
      }
    );

   }

}
