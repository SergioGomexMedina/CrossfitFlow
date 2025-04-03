import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
interface Clase {
  tipo: string;
  entrenador: string;
  fecha: string;
  duracion: number;
}

@Component({
  selector: 'app-reserva',
  standalone: false,
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent{
  clases: Clase[] = [];
  clasesFiltradas: Clase[] = [];
  filtroTipo: string = '';
  filtroFecha: string = '';

  constructor(private api: ApiService) {
    this.cargarClases();
  }

  private cargarClases(): void {
    this.api.getClases().subscribe((data) => {
      this.clases = data.clases;
      this.clasesFiltradas = this.clases;
    });
  }

  filtrarClases(): void {
    this.clasesFiltradas = this.clases.filter((clase) => {
      return (
        (!this.filtroTipo || clase.tipo === this.filtroTipo) &&
        (!this.filtroFecha || clase.fecha === this.filtroFecha)
      );
    });
  }
}
