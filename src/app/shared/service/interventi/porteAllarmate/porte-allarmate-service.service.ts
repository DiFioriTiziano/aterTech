import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private http_client:HttpClient ) {}

     interventiUpdated = new Subject<void>();


    read(filter:any) {
        return this.http_client.post<any>(`${environment.BASE_API_URL}/v0/dwh/manutenzioni/interventi/read`, filter)
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


    getInterventiUpdatedObservable(): Observable<void> {
      return this.interventiUpdated.asObservable();
    }

        emitDataUpdated(): void {
          this.interventiUpdated.next();
        }




 // http://192.168.9.206/v1
// JSON.stringify(contenuti)





}
