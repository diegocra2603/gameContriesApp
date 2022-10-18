import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Country } from './home/home.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _baseUrl = environment.baseUrl;

  get parmas () {
    return new HttpParams().set('fields', 'name,capital');
  }

  constructor(private _http: HttpClient) { }

  getPaisesPorContinente(continent:string, limit:number = 5 ) {

    const url = `${this._baseUrl}/region/${continent}`;

    return this._http.get<Country[]>(url, {params: this.parmas}).pipe(
      map( contries => {

        const contriesRandomOrder  = contries.sort(() => Math.random() - 0.5);

        let contriesObject: {[key:string]:string} = {};

        contriesRandomOrder.forEach((contry,index) => {

          if(index >= limit)
              return;

            contriesObject[this.removeSpaces(contry.name.common)] = contry.capital[0];

        });

        return contriesObject;
      })
    );

  }

  removeSpaces(text:string){
    return text.replace(/ /g, '');
  }

}
