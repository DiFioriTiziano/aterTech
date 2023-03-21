import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private http_client:HttpClient ) {}


    read(filter:any) {
        return this.http_client.post<any>(`${environment.BASE_API_URL}/interventi/prtall/read`, filter)
    }

    search(search:any) {
      let filter = {"matricola":search, "indirizzo": ""}
      //console.log("filtro passato... ",filter)
      return this.http_client.post<any>(`${environment.BASE_API_URL}/patrimonio/asset`, filter)
  }

}
