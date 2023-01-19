import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {margin-right: 5px;
            margin-top: 4px};
  `]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private PaisService: PaisService) { }

  getClassCSS (region: string): string{
    return (this.regionActiva === region) 
        ? 'btn btn-primary' 
        : 'btn btn-outline-primary'
  }

  activarRegion (region: string){

    if(region === this.regionActiva){ return }

    this.regionActiva = region;
    this.paises = [];
    this.PaisService.buscarRegion(region)
        .subscribe(paises=> this.paises = paises)
  }
}
