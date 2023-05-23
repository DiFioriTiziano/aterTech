import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { interventi, InterventiAter } from '../../../features/tecnici/interventi/model/interventi.model';
import { map } from 'rxjs/operators';
import { InterventiStoreService } from '../store/interventi-store.service';
import { UtilityService } from '../utility/utility.service';
import { VpsInterventiService } from './vps-interventi.service';
import { NotificationsModule } from './../../../views/notifications/notifications.module';



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
      .pipe(
          map( (resp:interventi) => resp.InterventiAter)
      ).subscribe(
        resp => { this.store.getInterventi(resp) } //passo gli interventi allo store
        )
    }

    create(FormCreate:any) {

      let bodyRequest={
        "id_esterno": 0,
        "id_tipologia":  FormCreate.vpsinf_tipologia,
        "matricola":  FormCreate.vpsinf_matricola,
        "note":  FormCreate.vpsinf_info,
        "data_intervento": this.utilityService.convertDateIso(FormCreate.vpsinf_dal),
        "ora_intervento": FormCreate.ora_dal,
        "data_fine": this.utilityService.convertDateIso(FormCreate.vpsinf_al),
        "utent_id": +localStorage.getItem('userID_Dwh')
      }

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/create`,bodyRequest)
          .subscribe( (intervento) => {

              if(this.interventi){
                let interventi = [intervento.itemCreato[0], ...this.interventi]
                  this.store.getInterventi(interventi)
              }

                let myIntervento = this.myInterventi?[...this.myInterventi, intervento.itemCreato[0]]:[intervento.itemCreato[0]]
                    this.store.myInterventi(myIntervento)
            }
          )
    }

    update(datiForm:any, item:any, type:string) {

      console.log("dati form", datiForm)

      //localStorage.getItem('userID_Dwh');

      let dal = this.utilityService.convertDateIso(datiForm.vpsinf_dal)
      let al = datiForm.vpsinf_al ? this.utilityService.convertDateIso(datiForm.vpsinf_al) : null

      let datiModificati = {
          "vpsinf_info":  datiForm.vpsinf_info,
          "vpsinf_dal": dal?dal:null,
          "vpsinf_al": al?al:null,
          "vpsinf_cancellato": datiForm.vpsinf_cancellato === true?"SI":"NO",
          "vpsinf_utent_id_aggiornamento": localStorage.getItem('userID_Dwh')
      }

      console.log("datiModificati", datiModificati)

      let bodyRequest =  {
          "id_ater": item.vpsinf_id,
          "id_esterno": item.vpsinf_id_esterno === null? 0 :item.vpsinf_id_esterno,
          "id_tipologia": item.tipvps_id,
          "data_fine": al?al:null,
          "note": datiForm.vpsinf_info,
          "data_inizio": dal?dal:null,
          "ora_inizio": '12:03:36',
          "type": '',
          "utent_id": localStorage.getItem('userID_Dwh'),
          "annullamento" : datiForm.vpsinf_cancellato === true? "1" : "0"
      }

      console.log("bodyRequest",bodyRequest)

      // due aggiornamenti differenti ( una con invio mail l'altro senza in caso di validazione )
      let funzione = type === 'Validazione'?'update_valida':'update';

         return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/${funzione}`,bodyRequest)
          .subscribe( (resp)=> {
            let interventoModificato = {...item, ...datiModificati}
              let Index = this.interventi.findIndex(lista => lista.vpsinf_id === item.vpsinf_id);
                this.interventi[Index] = interventoModificato;
                  this.store.getInterventi(this.interventi)
          })


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
      console.log(item, bodyRequest)
        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/convalida`,bodyRequest)
          .subscribe( (resp)=> {
              let nuovaListaInterventi = this.myInterventi.filter(lista => lista.vpsinf_id !== item.vpsinf_id);
                  this.store.myInterventi(nuovaListaInterventi)
                   this.vps_interventiService.vps_Crea(item).subscribe(console.log)
          })
    }

    conferma(item) {
      let bodyRequest =  {
          "id_ater": item.vpsinf_id
      }

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/conferma`,bodyRequest)
          .subscribe( (resp)=> {
              let nuovaListaInterventi = this.interventi.filter(lista => lista.vpsinf_id !== item.vpsinf_id);
                  this.store.getInterventi(nuovaListaInterventi)
          })
    }


    daConfermare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val =>  val.InterventiAter.filter(item => (item.vpsinf_flag_valido === 'SI' && item.vpsinf_utent_id_creazione === +localStorage.getItem('userID_Dwh') && item.vpsinf_flag_convalida === null)  ) ) //
            ).subscribe(
              resp => {
                console.log("my interventi!", resp)
                this.store.getInterventi(resp)
              } //passo gli interventi allo store
              )
    }


     // ****************** DA RAGGRUPPARE SOLO DA CONVALIDARE !!!!!
    daConvalidare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe(
              map(val =>  val.InterventiAter.filter( (item) => (item.vpsinf_flag_valido === 'SI') ))
              ).subscribe(
              resp => {
                console.log("my interventi!", resp)
                this.store.getInterventi(resp)
              }
              )
    }


    daValidare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val =>  val.InterventiAter.filter(item => (item.vpsinf_flag_valido === 'NO' && item.vpsinf_utent_id_creazione === 466)  ) ) // && item.vpsinf_flag_convalida === '1'
            ).subscribe(
              resp => { this.store.getInterventi(resp) } //passo gli interventi allo store
              )
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
        .subscribe(
            resp => {
                let Index = this.interventi.findIndex(lista => lista.vpsinf_id === itemModificato.vpsinf_id);
                  this.interventi[Index] = itemModificato;
                    let validati = this.interventi.filter((item)=> item.vpsinf_flag_valido === 'NO')
                      this.store.getInterventi(validati) //passo gli interventi allo store
            }
          )
    }

    tipologie() {
      return this.http_client.get<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/tipologie/read`)
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



 // http://192.168.9.206/v1
// JSON.stringify(contenuti)





}
