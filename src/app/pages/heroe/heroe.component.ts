import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { format } from 'path';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit
{
  heroe = new HeroeModel();

  constructor() { }

  guardar(heroeForm: NgForm)
  {
    if(heroeForm.invalid)
    {
      return;
    }

    console.log(this.heroe);
  }

  ngOnInit() {
  }

}
