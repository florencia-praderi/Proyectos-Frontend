import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [`
  div{
    width: 100%;
    height: 150px;
    margin: 0px;
  }`]
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    //creo el mapa
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
  });

    //creo el marcador
    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);

  }

}
