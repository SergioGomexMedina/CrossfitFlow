import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  avatarSeleccionado: string = '';

  constructor(private router: Router, private user: UserService) {}

  ngOnInit() {
    this.user.selectedAvatar$.subscribe((ruta) => {
      this.avatarSeleccionado = ruta;
    });
  }

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

  goToReserva() {
    this.router.navigate(['/lista']);
  }

  goToPerfil() {
    this.router.navigate(['/personales']);
  }
}
