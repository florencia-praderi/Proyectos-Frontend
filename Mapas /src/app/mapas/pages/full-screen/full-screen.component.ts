import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

//sistema viejo de importac, queda feo, por eso hago lo de arriba
//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa{
      width: 100%;
      height: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ 2.1626489865364404, 41.40554549018509],
    zoom: 17
});

  }

}
