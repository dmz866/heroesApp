import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent
{
  heroes: HeroeModel[] = [];
  loading = true;

  constructor(private heroesService: HeroesService)
  {
    heroesService.getAllHeroes()
    .subscribe(respuesta =>
      {
        this.heroes = respuesta;
        this.loading = false;
      });
  }

  eliminar(heroe: HeroeModel, indx: number)
  {
    Swal.fire(
      {
        title: 'Esta seguro?',
        text: `Esta seguro de eliminar a ${heroe.nombre}`,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then( resp => {
        if(resp.value)
        {
          this.confirmarEliminar(heroe, indx);
        }
      });
  }

  confirmarEliminar(heroe: HeroeModel, indx: number)
  {
    this.heroesService.eliminarHeroe(heroe.id)
    .subscribe(respuesta =>
      {
        Swal.fire(
          {
            title: 'Heroe eliminado',
            type: 'info',
            text: `${heroe.nombre} eliminado`
          });
        this.heroes.splice(indx, 1);
      });
  }
}
