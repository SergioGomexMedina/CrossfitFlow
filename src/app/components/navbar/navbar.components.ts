import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goToInicio() {
    this.router.navigate(['/inicio']);
  }

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
