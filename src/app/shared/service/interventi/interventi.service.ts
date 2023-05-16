import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { interventi, InterventiAter } from '../../../features/tecnici/interventi/model/interventi.model';
import { map } from 'rxjs/operators';
import { InterventiStoreService } from '../store/interventi-store.service';
import { UtilityService } from '../utility/utility.service';



@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  interventi: InterventiAter[]
  myInterventi: InterventiAter[]

  constructor(private http_client:HttpClient,
    private store:InterventiStoreService,
    private utilityService : UtilityService,
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
        "utent_id": 466
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

    update(datiForm:any, item:any) {

      let dal = this.utilityService.convertDateIso(datiForm.vpsinf_dal)
      let al = this.utilityService.convertDateIso(datiForm.vpsinf_al)
      let datiModificati = {
          "vpsinf_info":  datiForm.vpsinf_info,
          "vpsinf_dal": dal?dal:null,
          "vpsinf_al": al?al:null,
          "vpsinf_cancellato": datiForm.vpsinf_cancellato === true?"SI":"NO"
         // "vpsinf_utent_id_aggiornamento":""   !!! aggiungere dopo aver sistematop autenticazione!!!!
      }
      console.log(datiModificati)
      let bodyRequest =  {
          "id_ater": item.vpsinf_id,
          "id_esterno": item.vpsinf_id_esterno === null? 0 :item.vpsinf_id_esterno,
          "id_tipologia": item.tipvps_id,
          "data_fine": al?al:null,
          "note": datiForm.vpsinf_info,
          "data_inizio": dal?dal:null,
          "ora_inizio": '12:03:36',
          "type": '',
          "utent_id": 466,
          "annullamento" : datiForm.vpsinf_cancellato === true? "1" : "0"
      }
      console.log(bodyRequest)

        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/update`,bodyRequest)
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
              console.log("service data... ",nuovaListaInterventi)
                  this.store.myInterventi(nuovaListaInterventi)
          })
    }



    daValidare(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val =>  val.InterventiAter.filter(item => item.vpsinf_flag_valido === 'NO'  ) ) // && item.vpsinf_flag_convalida === null
            ).subscribe(
              resp => { this.store.getInterventi(resp) } //passo gli interventi allo store
              )
    }

    validati(filtro:any) {
      return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filtro)
        .pipe( // recupero interventi da api
              map(val => val.InterventiAter.filter((item)=> item.vpsinf_flag_valido === 'SI') )
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
