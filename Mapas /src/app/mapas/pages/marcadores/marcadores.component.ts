import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
    li{
      cursor: pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ 2.1626489865364404, 41.40554549018509];

  //Arreglo de marcadores para que se vayan guardando
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
  });

  this.leerLocalStorage();

  //Esto agrega un marker cuando se inicializa la app pero quiero
  //hacerlo de manera dinamica, a traves del btn de agregar
  // const marker = new mapboxgl.Marker()
  // .setLngLat(this.center)
  // .addTo(this.mapa);
  }

  agregarMarcador(){
    //codigo para generar color aleatorio
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador =  new mapboxgl.Marker({
      draggable: true,
      color: color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

    //inserto el nuevo marcador en el arr de marcadores
    this.marcadores.push({
      color: color,
      marker: nuevoMarcador
    })

    //guardo el marcador en local storage
    this.guardarMarcadoresLocalStorage()

    //si se mueve, lo guardo en el local storage
    nuevoMarcador.on('dragend', ()=>{
      this.guardarMarcadoresLocalStorage()
    })
  }

  irMarcador(marker: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){
    //para guardar en el localstorage tienen que ser solo strings

    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      })
    })
    
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)
  
    lngLatArr.forEach( m => {
      const nuevoMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);

      this.marcadores.push({
        marker: nuevoMarcador,
        color: m.color
      })

      //agrego un listener para cada vez que mueva un marker
      nuevoMarcador.on('dragend', ()=>{
        this.guardarMarcadoresLocalStorage()
      })
    })
  }

  borrarMarcador(i: number){
    //remuevo el logo
    this.marcadores[i].marker?.remove();
    //remuevo el texto
    this.marcadores.splice(i, 1);
  }

}
