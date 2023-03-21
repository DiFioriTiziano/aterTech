import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http_client:HttpClient ) { }


  assetAll() {
    return this.http_client.get<any>(`${environment.BASE_API_URL}/patrimonio/assetAll`)
  }



}
