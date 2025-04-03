import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  standalone: false,
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
  constructor(private router : Router){}
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
  goToLista() {
    this.router.navigate(['/lista']);
  }
}
