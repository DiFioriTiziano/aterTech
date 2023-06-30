import { Component, Input, OnInit } from '@angular/core';
import { InterventiService } from '../../../../../shared/service/interventi/interventi.service';
import { InterventiAter } from '../../model/interventi.model';
import { UtilityService } from '../../../../../shared/service/utility/utility.service';
import { InterventiStoreService } from '../../../../../shared/service/store/interventi-store.service';
import { SharingInterventiService } from '../../../../../shared/service/interventi/sharing-interventi.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterventiNotificheComponent } from '../interventi-notifiche/interventi-notifiche.component';
import { VpsInterventiService } from '../../../../../shared/service/interventi/vps-interventi.service';


@Component({
  selector: 'ater-interventi-update-container',
  template: `
        <ater-interventi-update
          *ngIf="item"
          [title]="title"
          [dati]="item"
          [tipologie]="tipologie"
          [dataFile]="dataFile"
          (datiModificati)="update($event)"
          (add_datafile)="add_datafile($event)"
          (update_statoManutentivo)="update_statoManutentivo($event)"
          (update_verbaleTec)="update_verbaleTec($event)"
          (update_sequestro)="update_sequestro($event)"
          [type]="type"
          [statoManutentivoLista]="statoManutentivoLista"
        >
      </ater-interventi-update>
  `,
  styles: [
  ]
})
export class InterventiUpdateContainerComponent implements OnInit {

  tipologie: any

  item:any
  title:any
  type:any
  openNotifica:any
  dataFile:any

  statoManutentivoLista:any


  constructor(
      private interventiService: InterventiService,
      private utilityService : UtilityService,
      private store:InterventiStoreService,
      private sharingInterventiService : SharingInterventiService,
      private vps_interventiService : VpsInterventiService,
      public bsModalRef: BsModalRef,
      private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.interventiService.tipologie().subscribe( (res)=> this.tipologie = res.tipologie);
    this.interventiService.getstatoManutentivo().subscribe( (res)=> this.statoManutentivoLista = res.statoManutentivoList);
    this.interventiService.dataFile(this.item).subscribe( (res)=> this.dataFile = res.dataFile);

    this.sharingInterventiService.dataFile_interventi$.subscribe( (resp) => {this.dataFile = resp, console.log("in ascolto... ",resp)})
   }

   update(datiForm){
    console.log(datiForm)

    let UTC_dal = this.utilityService.createUTC_ISOstring(datiForm.vpsinf_dal,datiForm.vpsinf_ora_dal)
      let dal = datiForm.vpsinf_dal ? UTC_dal : ""
    let UTC_al = this.utilityService.createUTC_ISOstring(datiForm.vpsinf_al,datiForm.vpsinf_ora_al)
      let al = datiForm.vpsinf_al ? UTC_al : ""

    let datiModificati = {
      "vpsinf_info":  datiForm.vpsinf_info,
      "vpsinf_dal": dal,
      "vpsinf_al": al,
      "vpsinf_cancellato": datiForm.vpsinf_cancellato === true?"SI":"NO",
      "utente_aggiornamento": localStorage.getItem('nominativoDwh'),
      "vpsinf_allarmato_id": datiForm.vps_esito_intervento
    }


    this.interventiService.update(datiForm, this.item, this.type)
      .subscribe( (resp)=> { console.log(resp)
        let interventoModificato = {...this.item, ...datiModificati}
          this.sharingInterventiService.subject_update_interventi(interventoModificato)
           // this.vps_interventiService.vps_Update(interventoModificato).subscribe(console.log)
      })

   }



  update_statoManutentivo(req){
    console.log(req) // ***** QUI DOVREI RIAGGIORNARE I DATI SOTTO !!!
    this.interventiService.updateStatoManutentivo(req).subscribe(
      ()=> {
        this.bsModalRef = this.modalService.show(InterventiNotificheComponent);
      }
    )
  }

  update_verbaleTec(req){
    this.interventiService.updateVerbaleTech(req).subscribe(
      ()=> {
        this.bsModalRef = this.modalService.show(InterventiNotificheComponent);
      }
    )
   }

   update_sequestro(req){
    this.interventiService.updateSequestro(req).subscribe(
      ()=> {
        this.bsModalRef = this.modalService.show(InterventiNotificheComponent);
      }
    )
  }

  add_datafile(datiDaAggiungere){
    this.interventiService.addFile(datiDaAggiungere)
      .subscribe( (resp)=> {
        console.log(resp)
        datiDaAggiungere = {...datiDaAggiungere,"docope_ID" : resp.idCreated}
          this.dataFile.push(datiDaAggiungere)
            this.sharingInterventiService.subject_dataFile_interventi(this.dataFile)
    })
  }


}
