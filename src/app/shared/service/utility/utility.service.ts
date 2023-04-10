import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

convertIsoDate(isoString){
  return  new Date(isoString).toLocaleDateString('en-CA')

}

convertDateIso(date){
   let isoDate = new Date(date)
       return  isoDate.toISOString()

 }

}
