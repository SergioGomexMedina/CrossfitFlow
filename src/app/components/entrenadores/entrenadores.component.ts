import { Component } from '@angular/core';
import { EntrenadoresService } from '../../service/entrenadores.service';
import { Router } from '@angular/router';

interface Entrenador {
  nombre: string;
  descripcion: string;
  especialidad: string;
  certificaciones: string[];
  anos_experiencia: number;
  disponibilidad: string[];
  frase_motivacional: string;
  imagen: string;
  
}


@Component({
  selector: 'app-entrenadores',
  standalone: false,
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export class EntrenadoresComponent {
  entrenadores: Entrenador[] = [];

  constructor(private entrenadoresService: EntrenadoresService, private router : Router) {
    this.cargarEntrenadores();
  }

  private cargarEntrenadores(): void {
    this.entrenadoresService.obtenerEntrenadores().subscribe((data) => {
      this.entrenadores = data.entrenadores;
    });
  }
  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToClases() {
    this.router.navigate(['/clases']);
  }
  goToActividades() {
    this.router.navigate(['/actividades']);
  }
  goToGimnasio() {
    this.router.navigate(['/gim']);
  }
  goToGim() {
    this.router.navigate(['/gim']);
  }
  goToLista() {
    this.router.navigate(['/lista']);
  }
}

