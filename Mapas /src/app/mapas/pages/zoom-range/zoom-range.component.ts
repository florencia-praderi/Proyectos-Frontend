import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //uso el viewchild para que angular le ponga el id a cada elemento
  //html, y yo le pongo ref local solamente (#mapa)
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ 2.1626489865364404, 41.40554549018509];

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{}),
    this.mapa.off('zoomend', ()=>{}),
    this.mapa.off('move', ()=>{})
  }

  //REGLA DE ORO: tengo que destruir todos los event listeners (on),
  //con el ng on destroy para no duplicar los eventos

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
  });

  //agrego un listener para que cuando hago zoom con el mouse
  //tambien cambie el valor del zoom y no solo al hacer click
  this.mapa.on('zoom', (ev)=>{
    const zoomActual = this.mapa.getZoom();
    this.zoomLevel = zoomActual;
  });

  this.mapa.on('zoomend', (ev)=>{
    if(this.mapa.getZoom() > 18){
      this.mapa.zoomTo(18)
    }
  })

  //agrego un listener para que cuando muevo el mapa con el mouse,
  //tambien cambie la lng y lat en el input
  this.mapa.on('move', (event)=>{
    const target = event.target;
    const { lng, lat } = target.getCenter();
    this.center = [ lng, lat ]
  })
  }

  zoomOut(){
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(){
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor))
    //con el metodo number transformo el string a number
  }

}
