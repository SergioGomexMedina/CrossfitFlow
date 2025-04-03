import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  standalone: false,
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.css'
})
export class ClasesComponent {
  constructor(private router : Router){}
  isModalOpen = false;
  modalTitle = '';
  modalPrice = '';
  modalDescription = '';

  openModal(title: string, price: string, description: string) {
    this.modalTitle = title;
    this.modalPrice = price;
    this.modalDescription = description;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
