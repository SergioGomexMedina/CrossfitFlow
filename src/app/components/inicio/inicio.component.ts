import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToClases() {
    this.router.navigate(['/lista']);
  }
  goToActividades() {
    this.router.navigate(['/actividades']);
  }
  goToEntrenadores() {
    this.router.navigate(['/entrenadores']);
  }
  goToPlanes() {
    this.router.navigate(['/clases']);
  }
  goToGim() {
    this.router.navigate(['/gim']);
  }
}
