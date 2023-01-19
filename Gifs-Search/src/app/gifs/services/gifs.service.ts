import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'YWR5eThHTkwTIWBEqa6AFmUnd4StMGXq';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  //Cambiar tipo any
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(
    private http: HttpClient ){
//El constructor se genera la primera y unica vez que el serv es llamado
//Por eso cargamos el local storage para que se almacenen las ult busq
      if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!) || []
      }
      if(localStorage.getItem('resultados')){
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
      }
  }

  buscarGifs(query: string){
//Para que sea lo mismo buscar en minuscula que en mayus
query = query.trim().toLocaleLowerCase();
//Si la busqueda no existe, insertarla (evita duplicarla)
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
//Limitar las busquedas mostradas a 10
    this._historial = this._historial.splice(0,10)  
//Guardar las busquedas en el local storage
    localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
            .subscribe((resp: SearchGifsResponse) => {
              console.log(resp.data)
              this.resultados = resp.data;
          //Guardar las imagenes en el local storage
              localStorage.setItem('resultados', JSON.stringify(this.resultados))
            })
  }
}
