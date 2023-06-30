import { Component, OnInit } from '@angular/core';
import { InterventiStoreService } from '../../../../shared/service/store/interventi-store.service';
import { InterventiService } from '../../../../shared/service/interventi/interventi.service';
import { InterventiAter } from '../model/interventi.model';
import { map, take } from 'rxjs/operators';
import { VpsInterventiService } from '../../../../shared/service/interventi/vps-interventi.service';
import { SharingInterventiService } from '../../../../shared/service/interventi/sharing-interventi.service';

@Component({
  selector: 'ater-interventi-convalida-container',
  template: `
    <ater-intervento-convalida
      *ngIf="interventi"
      [interventi]="interventi"
      (Item) = "convalida($event)"
    >
    </ater-intervento-convalida>
  `,
  styles: [ ]
})
export class InterventiConvalidaContainerComponent implements OnInit {

  interventi: InterventiAter[]

  constructor(private interventiService: InterventiService, private vps_interventiService : VpsInterventiService, private sharingInterventiService : SharingInterventiService) {

    this.sharingInterventiService.update_interventi$.subscribe( (itemAggiornato) =>{
      let Index = this.interventi.findIndex(lista => lista.vpsinf_id === itemAggiornato.vpsinf_id);
                this.interventi[Index] = itemAggiornato;
    })


   }

  ngOnInit(): void {
    this.interventiService.daConvalidare({"matricola":""})
    .pipe(
      map(val =>  val.InterventiAter.filter( (item) => item.vpsinf_flag_valido === 'SI' && item.vpsinf_flag_convalida === 1 )  )
    ).subscribe( resp => { this.interventi = resp
      }
    )
  }


  convalida(item){
     console.log("this.interventi ", this.interventi)
    this.interventiService.convalida(item,'u')
      .subscribe( (resp)=> {
        let nuovaListaInterventi = this.interventi.filter(lista => lista.vpsinf_id !== item.vpsinf_id);

            // this.vps_interventiService.vps_Crea(item).subscribe(console.log)
            this.interventi = nuovaListaInterventi
      })
  }


}
