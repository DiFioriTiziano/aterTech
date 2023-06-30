import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiAter } from '../model/interventi.model';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';
import { SharingInterventiService } from '../../../../shared/service/interventi/sharing-interventi.service';

@Component({
  selector: 'ater-interventi-programma-container',
  template: `
    <ater-interventi-programma
    *ngIf="myInterventi"
      [myInterventi]="myInterventi"
      (conferma)="conferma($event)"

    >
    </ater-interventi-programma>
  `,
  styles: []
})
export class InterventiProgrammaContainerComponent implements OnInit {

  myInterventi: InterventiAter[]
  UpdateIntervento: any;

  constructor(private store:InterventiStoreService,private interventiService: InterventiService, private sharingInterventiService : SharingInterventiService) {

    this.sharingInterventiService.add_interventi$.subscribe( (newItem) =>{
      let newInterventi  = [newItem, ...this.myInterventi]
        this.myInterventi = newInterventi
    })

    this.sharingInterventiService.update_interventi$.subscribe( (itemAggiornato) =>{
      let Index = this.myInterventi.findIndex(lista => lista.vpsinf_id === itemAggiornato.vpsinf_id);
                this.myInterventi[Index] = itemAggiornato;
    })

   }


  ngOnInit(): void {
    this.interventiService.daConfermare({"matricola":""}).subscribe( (data => this.myInterventi= data));
  }



  conferma(item){
    this.interventiService.conferma(item)
    .subscribe( (resp)=> {
      let nuovaListaInterventi = this.myInterventi.filter(lista => lista.vpsinf_id !== item.vpsinf_id);
        this.myInterventi = nuovaListaInterventi
          //this.store.getInterventi(nuovaListaInterventi)
  })
  }

}
