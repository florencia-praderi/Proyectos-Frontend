import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  private apiUrl2: string = 'https://restcountries.com/v2'

      // get HttpParams(){
      //return new HttpParams()
      //   .set('fields', 'name,capital,alpha2Code,flag,population')
    //No lo pude hacer porque en RestCountries la ruta es otra a la del video
    //y si cambio la ruta de mi proyecto, la tabla se muestra dif porque tiene
    //otras props.
    //Luego de hacerlo funcionar lo llamo en cada return..(url, {this.httpParams})

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable <Country[]>{

    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get<Country[]>(url)
  }

  buscarCapital(termino:string): Observable <Country[]>{

    const url = `${this.apiUrl}/capital/${termino}`
    return this.http.get<Country[]>(url)
  }

  getPaisPorCodigo(id: string): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country>(url)
  }

  buscarRegion(region: string): Observable<Country[]>{

    const url = `${this.apiUrl}/region/${region}`
    return this.http.get<Country[]>(url)
    // .pipe(
    //   tap(console.log)
    // )
  }
}
