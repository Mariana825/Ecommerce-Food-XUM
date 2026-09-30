import { Component } from '@angular/core';
import { Hola } from '../core/interfaces/hola';

@Component({
  selector: 'app-hola',
  templateUrl: './hola.component.html',
  styleUrl: './hola.component.css'
})
export class HolaComponent {

  hola: Hola [] = [
    {
    hola:'hola', adios: 'adios', veces: 2
    }
    
  ]
}
