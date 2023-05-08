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
        (valida)="valida($event)"
        (intervento)="set_Intervento_Store($event)"

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
      this.store.interventi$.subscribe(data => this.interventi = data);
     // this.store.intervento$.subscribe(intervento => console.log("ascolto il container valida: ",intervento));
  }


  ngOnInit(): void {
    //this.interventiService.getSubjectInterventi().subscribe( resp=> this.interventiLista = resp  )
     // this.interventiService.readData()

      // recupera tutti interventi vps
      let filtro = {"matricola":""}
          this.interventiService.read(filtro).pipe( // recupero interventi da api
            map(val => val.filter((item)=> item.vpsinf_flag_valido === 'NO') )
          ).subscribe(
            resp => { this.store.getInterventi(resp) } //passo gli interventi allo store
            )



/*                 this.interventiService.getSubjectInterventiUpdated().subscribe((res) => {

                  switch(res.operazione) {
                    case "R": { //crea
                      //this.interventiLista  = [res.data[0], ...this.interventiLista]
                      break;
                    }

                    case "U": { //aggiorna
                      console.log("modifica da apportare!",res.data)
                      let Index = this.interventiLista.findIndex(lista => lista.vpsinf_id === res.data.vpsinf_id);
                          this.interventiLista[Index] = res.data;
                      break;
                    }
                    case "C": { //crea
                      this.interventiLista  = [res.data[0], ...this.interventiLista]
                      break;
                    }
                    case "V": { //validazione
                      console.log("modifica da apportare!",res.data)
                        this.interventiLista = this.interventiLista.filter(lista => lista.vpsinf_id !== res.data.vpsinf_id);
                      break;
                    }
                    default: {
                      //statements;
                      break;
                    }
                  }


                }) */



  }



  set_Intervento_Store(intervento){
    this.store.set_Intervento(intervento)
  }


/*   valida(item){

    let request = {
        id_ater: item.vpsinf_id,
        utent_id: 425
    }

    let itemModificato = {...item,"vpsinf_flag_valido": "SI"};

        this.interventiService.valida(request).subscribe( (res) =>
          {
            this.interventiService.emitData({"data":itemModificato,"operazione":"V"});
          },
            (error) => {
              console.error(error);
            }
          );
} */


/* datiAnnullati(datoAnnullato){

  let annullato = {
    "id_ater":datoAnnullato.vpsinf_id,
    "note":datoAnnullato.vpsinf_id,
    "utent_id":datoAnnullato.vpsinf_id,
  }
} */


}
