import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { interventi, InterventiAter } from '../../../features/tecnici/interventi/model/interventi.model';
import { map, take } from 'rxjs/operators';
import { InterventiStoreService } from '../store/interventi-store.service';
import { UtilityService } from '../utility/utility.service';
import { VpsInterventiService } from './vps-interventi.service';
import { NotificationsModule } from './../../../views/notifications/notifications.module';
import { SharingInterventiService } from './sharing-interventi.service';

import * as moment from 'moment';
import 'moment-timezone';




@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  interventi: InterventiAter[]
  myInterventi: InterventiAter[]

  constructor(private http_client:HttpClient,
    private store:InterventiStoreService,
    private utilityService : UtilityService,
    private vps_interventiService : VpsInterventiService
  ) {
    this.store.interventi$.subscribe(data => {this.interventi = data });
    this.store.myIntervento$.subscribe(data => { this.myInterventi = data });
    }

     interventiUpdated = new Subject<any>();

     interventiData = new Subject<any>();


    read(filter:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filter)

    }


    create(FormCreate:any, vpsinf_stato_immobile) {

      console.log(FormCreate)



          let bodyRequest={
            "id_esterno": 0,
            "id_tipologia":  FormCreate.vpsinf_tipologia,
            "matricola":  FormCreate.vpsinf_matricola,
            "note":  FormCreate.vpsinf_info,
            "data_intervento": this.utilityService.convertDateIso(FormCreate.vpsinf_dal),
            "ora_intervento": FormCreate.ora_dal,
            "data_fine": this.utilityService.convertDateIso(FormCreate.vpsinf_al),
            "utent_id": +localStorage.getItem('userID_Dwh'),
            "vpsinf_allarmato_id": vpsinf_stato_immobile // !!!! è QUESTO DATO CHE NON FA IN TEMPO A TORNARE!!!
          }

      console.log(bodyRequest)
            return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/xx`, bodyRequest)
    }



    update(datiForm:any, item:any, type:string) {

      // DATA/ORA INIZIO
      const dataDal: string = datiForm.vpsinf_dal
      const orarioDal: string = datiForm.vpsinf_ora_dal
        let convertUTC_DAL = this.utilityService.createUTC_ISOstring(dataDal, orarioDal)
        let data_Dal_UTC = datiForm.vpsinf_dal ? convertUTC_DAL : ""
      // DATA/ORA FINE
      const dataAl: string = datiForm.vpsinf_al
      const orarioAl: string = datiForm.vpsinf_ora_al
        let convertUTC_AL = this.utilityService.createUTC_ISOstring(dataAl, orarioAl)
        let data_Al_UTC = datiForm.vpsinf_al ? convertUTC_AL : ""

        console.log(datiForm)

        let bodyRequest =  {
            "id_ater": item.vpsinf_id,
            "id_esterno": item.vpsinf_id_esterno === null? 0 :item.vpsinf_id_esterno,
            "id_tipologia": item.tipvps_id,
            "data_fine": data_Al_UTC,
            "note": datiForm.vpsinf_info,
            "data_inizio": data_Dal_UTC,
            "ora_inizio": orarioDal,
            "type": '',
            "utent_id": localStorage.getItem('userID_Dwh'),
            "annullamento" : datiForm.vpsinf_cancellato === true? 1 : 0,
            "vpsinf_allarmato_id": datiForm.vps_esito_intervento// +item.vpsinf_allarmato_id
        }

        console.log(bodyRequest)
          // due aggiornamenti differenti ( una con invio mail l'altro senza in caso di validazione )
        let funzione = type === 'Validazione'?'update_valida':'update';

    return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/${funzione}`,bodyRequest)

    }



    delete(object:any): Observable<any> {
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/delete`,object)
    }

    convalida(item, tipo) {
          let bodyRequest =  {
              "id_ater": item.vpsinf_id,
              "utent_id": item.vpsinf_utent_id_creazione,
              "tipo" : tipo
          }
    return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/convalida`,bodyRequest)

    }

    conferma(item) {
        let bodyRequest =  {
            "id_ater": item.vpsinf_id
        }
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/conferma`,bodyRequest)
    }


    daConfermare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val =>  val.InterventiAter.filter(item => (item.vpsinf_flag_valido === 'SI' && item.vpsinf_flag_convalida !== 1 && item.vpsinf_utent_id_creazione === +localStorage.getItem('userID_Dwh') )  ) ) //
            )/* .subscribe(
              resp => {
               // console.log("my interventi!", resp)
               // this.store.getInterventi(resp)
              } //passo gli interventi allo store
              ) */
    }


     // ****************** DA RAGGRUPPARE SOLO DA CONVALIDARE !!!!!
    daConvalidare(filtro:any) {
     return  this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)

    }


    daValidare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
    }

    validati(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val => val.InterventiAter.filter((item)=> item.vpsinf_flag_valido === 'SI') ) // item.vpsinf_flag_valido === 'SI'
            ).subscribe(
              resp => { this.store.getInterventi(resp) } //passo gli interventi allo store
              )
    }

    valida(itemModificato)  {
        let request = {
          id_ater: itemModificato.vpsinf_id,
          utent_id: 425
        }
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/valida`,request)
    }

    tipologie() {
      return this.http_client.get<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/tipologie/read`)
    }


    getstatoManutentivo() {
      return this.http_client.get<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/readStatoManutentivo`)
    }


    updateStatoManutentivo(req){
      let requestBody = {
        "id_ater":req.idItem,
        "idStato":+req.statoManutentivo,
        "utent_id" : localStorage.getItem('userID_Dwh')
      }
      console.log(requestBody)
    return  this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/StatoManutentivo`, requestBody)
    }

    updateVerbaleTech(req){
      let requestBody = {
        "id_ater":req.idItem,
        "utent_id" : localStorage.getItem('userID_Dwh'),
        "flag_verbale": req.valoreVerbale === true ? 1 : 0
      }
      console.log(requestBody)
    return  this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/flagVerbale`, requestBody)
    }

    updateSequestro(req){
      let requestBody = {
        "id_ater":req.idItem,
        "utent_id" : localStorage.getItem('userID_Dwh'),
        "flag_sequestro": req.valoreSequestro === true ? 1 : 0
      }
      console.log(requestBody)
    return  this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/flagSequestro`, requestBody)
    }


    getSubjectInterventiUpdated(): Observable<any> {
      return this.interventiUpdated;
    }

        getSubjectInterventi(): Observable<any> {
          return this.interventiData.asObservable();
        }






    delData():void {

          this.interventiData.next([]);

    }

    emitDataCreate(obj_creato):void {
          this.interventiUpdated.next(obj_creato);
    }

    emitData(obj):void {
      this.interventiUpdated.next(obj);
    }


        emitDataUpdated(modifica):void {
              this.interventiUpdated.next(modifica);
        }



  dataFile(item) {
    let bodyRequest =  {
        "id_ater": item.vpsinf_id,
        "matricola": item.vpsinf_matricola,
        "utent_id": localStorage.getItem('userID_Dwh')
    }

  return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/dataFile`,bodyRequest)
  }


  addFile(item) {
    let bodyRequest =  {
        "id_ater": item.docope_vps_id,
        "matricola": item.docope_matricola,
        "utent_id": localStorage.getItem('userID_Dwh'),
        "file": item.docope_tipo_file,
        "linkFile": item.docope_DOCUM_LINK
    }
console.log(bodyRequest)
  return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/saveFile`,bodyRequest)
  }


// JSON.stringify(contenuti)





}
