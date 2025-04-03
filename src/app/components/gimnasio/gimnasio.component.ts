import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-gimnasio',
  standalone: false,
  templateUrl: './gimnasio.component.html',
  styleUrl: './gimnasio.component.css'
})
export class GimnasioComponent {
  constructor(private router : Router){}
  imagenes = [
    { src: '../../../assets/entrada.jpg', alt: 'Entrada' },
    { src: '../../../assets/gimnasiopa.jpg', alt: 'Gimnasio' },
    { src: '../../../assets/equipamiento.jpeg', alt: 'Equipamiento' },
    { src: '../../../assets/anillas.jpg', alt: 'Anillas' },
    { src: '../../../assets/zonaentre.jpeg', alt: 'Zona de entrenamiento' },
    { src: '../../../assets/material.jpeg', alt: 'Material' }
  ];
  imagenSeleccionada: { src: string; alt: string } | null = null;

 
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
