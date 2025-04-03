import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  constructor(private router : Router){}
  clases = [
    { imagen: '../../../assets/cross1.jpg', nombre: 'CrossFit', duracion: '45 min', tipo: 'Movimentos funcionales ejecutados a alta intensidad.' },
    { imagen: '../../../assets/cross2.jpg', nombre: 'OpenBox', duracion: '60 min', tipo: 'Entrenamiento libre' },
    { imagen: '../../../assets/cross3.jpg', nombre: 'Strenght', duracion: '90 min', tipo: 'Trabajo para mejorar la fuerza fisica' },
    { imagen: '../../../assets/cross4.jpg', nombre: 'CrossFit', duracion: '45 min', tipo: 'Movimentos funcionales ejecutados a alta intensidad.' },
    { imagen: '../../../assets/cross5.jpg', nombre: 'Strenght', duracion: '90 min', tipo: 'Trabajo para mejorar la fuerza fisica' }
  ];
  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToClases() {
    this.router.navigate(['/clases']);
  }
  goToActividades() {
    this.router.navigate(['/actividades']);
  }
  goToEntrenadores() {
    this.router.navigate(['/entrenadores']);
  }
  goToGim() {
    this.router.navigate(['/gim']);
  }
}
