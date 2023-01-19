import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial () {
    return this.GifsService.historial
  }

  buscar(argumento: string){
    this.GifsService.buscarGifs(argumento)
  }

  constructor(private GifsService: GifsService){}

}
