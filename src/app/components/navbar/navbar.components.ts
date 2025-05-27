import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToPersonales() {
    this.router.navigate(['/personales']);}

  goToClases() {
    this.router.navigate(['/planes']);
  }

  goToEntrenadores() {
    this.router.navigate(['/entrenadores']);
  }

  goToActividades() {
    this.router.navigate(['/actividades']);
  }

  goToLista() {
    this.router.navigate(['/reserva']);
  }
}
