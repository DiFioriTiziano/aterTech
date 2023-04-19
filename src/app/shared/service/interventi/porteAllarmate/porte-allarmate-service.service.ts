import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { interventi, InterventiAter } from '../../../../features/tecnici/interventi/model/interventi.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class InterventiService {


  constructor(private http_client:HttpClient ) {}

     interventiUpdated = new Subject<any>();


    read(filter:any) {
        return this.http_client.post<interventi>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filter)
        .pipe(
          map( (resp:interventi) => resp.InterventiAter)
        )
    }

    create(object:any): Observable<any> {
        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/create`,object)

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


    getSubjectInterventiUpdated(): Observable<any> {
      return this.interventiUpdated;
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
