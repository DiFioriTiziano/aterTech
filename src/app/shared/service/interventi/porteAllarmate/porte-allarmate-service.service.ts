import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { interventi } from '../../../../features/tecnici/interventi/model/interventi.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private http_client:HttpClient ) {}

     interventiUpdated = new Subject<void>();


/*
     getPizzas$: Observable<Pizza[]> = of([
      { id: "j8P9sz", name: "Pepperoni", price: 899 },

    ]); */


    interventi$: Observable<interventi>  = of([
      message: "success",
      status: true,
      InterventiAter:[
        {
          vpsinf_id_esterno: 0,
          vpsinf_flag_valido: "NO",
          vpsinf_id: 9999,
          vpsinf_matricola: "5423INC215",
          vpsinf_info: "test mok data",
          vpsinf_indirizzo: "via da qui",
          vpsinf_dal: "2023-04-09T15:00:00.000Z",
          vpsinf_ora: "12:12:00",
          vpsinf_al: "2023-04-09T15:00:00.000Z",
          vpsinf_utent_id_creazione: 425,
          vpsinf_data_creazione: "2023-04-09T15:00:00.000Z",
          vpsinf_utent_id_aggiornamento: 425,
          vpsinf_data_aggiornamento: "2023-04-09T15:00:00.000Z",
          vpsinf_cancellato: "NO",
          vps_id_appalto: 1,
          vpsinf_tipvs_id: 2,
          tipvps_id: 3,
          tipvps_descrizione: "test ",
          tipvps_data_inizio: "2023-04-09T15:00:00.000Z",
          tipvps_data_fine: "2023-04-09T15:00:00.000Z",
          tipvps_template: "x",
          utente_creazione: "425",
          utente_aggiornamento: 425
      },
      {

        vpsinf_id_esterno: 0,
        vpsinf_flag_valido: "NO",
        vpsinf_id: 1111,
        vpsinf_matricola: "6623INC215",
        vpsinf_info: "test mok data",
        vpsinf_indirizzo: "via da qui",
        vpsinf_dal: "2023-04-09T15:00:00.000Z",
        vpsinf_ora: "12:12:00",
        vpsinf_al: "2023-04-09T15:00:00.000Z",
        vpsinf_utent_id_creazione: 425,
        vpsinf_data_creazione: "2023-04-09T15:00:00.000Z",
        vpsinf_utent_id_aggiornamento: 425,
        vpsinf_data_aggiornamento: "2023-04-09T15:00:00.000Z",
        vpsinf_cancellato: "NO",
        vps_id_appalto: 1,
        vpsinf_tipvs_id: 2,
        tipvps_id: 3,
        tipvps_descrizione: "test ",
        tipvps_data_inizio: "2023-04-09T15:00:00.000Z",
        tipvps_data_fine: "2023-04-09T15:00:00.000Z",
        tipvps_template: "x",
        utente_creazione: "425",
        utente_aggiornamento: 425

    }
    ]
  ])



readTest(filter:any) {
  return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filter)
  .pipe(
    map( (resp) => resp.InterventiAter )
  )
}


    read(filter:any) {
        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filter)
        .pipe(
          map( (resp) => resp.InterventiAter )
        )
    }

    create(object:any): Observable<any> {
        return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/create`,object)
    }


    update(object:any): Observable<any> {
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/update`,object)
    }

    delete(object:any): Observable<any> {
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/delete`,object)
    }

    valida(object:any): Observable<any> {
      return this.http_client.post<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/valida`,object)
    }

    tipologie() {
      return this.http_client.get<any>(`${environment.BASE_API_URL}/v1/interventi/prtall/tipologie/read`)
    }


    getSubjectInterventiUpdated(): Observable<void> {
      return this.interventiUpdated;
    }

        emitDataUpdated():void {
            let filter = {"matricola":""}
            this.read(filter).subscribe( (data)=> {
            //  this.interventiUpdated.next(data);
            })

        }



 // http://192.168.9.206/v1
// JSON.stringify(contenuti)





}
