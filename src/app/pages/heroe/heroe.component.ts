import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit
{
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute){}

  guardar(heroeForm: NgForm)
  {
    if(heroeForm.invalid)
    {
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    peticion = (this.heroe.id) ? this.heroesService.actualizarHeroe(this.heroe) :
                                 this.heroesService.crearHeroe(this.heroe);

    peticion.subscribe(respuesta =>
      {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo correctamente',
          type: 'success'
        });
      });
  }

  ngOnInit()
  {
    const id = this.route.snapshot.paramMap.get('id');
    if(id && id !== 'nuevo')
    {
      this.heroesService.getHeroe(id)
      .subscribe((respuesta: HeroeModel) =>
      {
        this.heroe = respuesta;
        this.heroe.id = id;
      });
    }
  }

}
