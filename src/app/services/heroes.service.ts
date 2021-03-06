import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService
{
  private url = 'https://heroesapp-c1532.firebaseio.com';

  constructor(private http: HttpClient)
  { }

  crearHeroe(heroe: HeroeModel)
  {
    return this.http.post(`${this.url}/heroes.json`, heroe)
            .pipe(map(resp =>
              {
                heroe.id = resp['name'];
                return heroe;
              }));
  }

  actualizarHeroe(heroe: HeroeModel)
  {
    const heroeTemp = {...heroe};
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getAllHeroes()
  {
    return this.http.get(`${this.url}/heroes.json`).pipe(map(this.crearArregloHeroes));
  }

  getHeroe(id: string)
  {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  eliminarHeroe(id: string)
  {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArregloHeroes(heroesObj: Object)
  {
    if(heroesObj === null)
    {
      return [];
    }

    const heroes: HeroeModel[] = [];
    Object.keys(heroesObj).forEach(key =>
    {
       const heroe: HeroeModel = heroesObj[key];
       heroe.id = key;
       heroes.push(heroe);
    });

    return heroes;
  }
}
