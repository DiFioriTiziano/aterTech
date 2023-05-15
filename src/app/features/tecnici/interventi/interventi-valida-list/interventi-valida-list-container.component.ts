import { Component, OnInit } from '@angular/core';
import { InterventiAter } from '../model/interventi.model';
import { InterventiService } from '../../../../shared/service/interventi/porteAllarmate/porte-allarmate-service.service';
import { filter, map } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';

@Component({
  selector: 'ater-interventi-valida-list-container',
  template: `
  <div class="animated fadeIn">

    <ater-interventi-valida-list
      *ngIf="interventi"
        [interventiLista] = "interventi"
        (annullamento)="datiAnnullati($event)"
        (valida)="validazione($event)"


    ></ater-interventi-valida-list>

  </div>
  `,
  styles: [
  ]
})
export class InterventiValidaListContainerComponent implements OnInit {

 // interventiLista:InterventiAter[];

  interventi:InterventiAter[];

  constructor(private interventiService: InterventiService, private store:InterventiStoreService) {
      // mi sottoscrivo al mio subject e rimango in ascolto
      this.store.interventi$.subscribe(data => {this.interventi = data});


     // this.store.intervento$.subscribe(intervento => console.log("ascolto il container valida: ",intervento));
  }


  ngOnInit(): void {
      this.interventiService.daValidare({"matricola":""});
  }



 /*  set_Intervento_Store(intervento){
    //this.store.set_Intervento(intervento)
  } */


  validazione(item){
    let itemModificato = {...item,"vpsinf_flag_valido": "SI"};
    this.interventiService.valida(itemModificato)
  }





/* datiAnnullati(datoAnnullato){

  let annullato = {
    "id_ater":datoAnnullato.vpsinf_id,
    "note":datoAnnullato.vpsinf_id,
    "utent_id":datoAnnullato.vpsinf_id,
  }
} */


}
