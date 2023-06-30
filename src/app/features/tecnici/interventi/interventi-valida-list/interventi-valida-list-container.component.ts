import { Component, OnInit } from '@angular/core';
import { InterventiAter } from '../model/interventi.model';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';
import { filter, map } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { SharingInterventiService } from '../../../../shared/service/interventi/sharing-interventi.service';

@Component({
  selector: 'ater-interventi-valida-list-container',
  template: `
  <div class="animated fadeIn">

    <ater-interventi-valida-list
      *ngIf="interventi"
        [interventiLista] = "interventi"
        (valida)="validazione($event)"
    ></ater-interventi-valida-list>

  </div>
  `,
  styles: [
  ]
})
export class InterventiValidaListContainerComponent implements OnInit {

  interventi:InterventiAter[];

  constructor(private interventiService: InterventiService, private store:InterventiStoreService, private sharingInterventiService : SharingInterventiService) {

    this.sharingInterventiService.update_interventi$.subscribe( (itemAggiornato) =>{
      let Index = this.interventi.findIndex(lista => lista.vpsinf_id === itemAggiornato.vpsinf_id);
                this.interventi[Index] = itemAggiornato;
    })

  }


  ngOnInit(): void {
      this.interventiService.daValidare({"matricola":""})
      .pipe(
          map(val =>  val.InterventiAter.filter(item => (item.vpsinf_flag_valido === 'NO' && item.vpsinf_utent_id_creazione === 466)  ) ) // && item.vpsinf_flag_convalida === '1'
      ).subscribe( resp => { this.interventi = resp /* this.store.getInterventi(resp) */ }   )
  }


  validazione(item){
    let itemModificato = {...item,"vpsinf_flag_valido": "SI"};
    this.interventiService.valida(itemModificato)
    .subscribe( resp => {
          let nuovaLista = this.interventi.filter(lista => lista.vpsinf_id !== itemModificato.vpsinf_id);
            this.interventi = nuovaLista;
/*               let validati = this.interventi.filter((item)=> item.vpsinf_flag_valido === 'NO')
                this.store.getInterventi(validati) //passo gli interventi allo store */
      }
    )

  }



}
