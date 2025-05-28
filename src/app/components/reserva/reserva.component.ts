import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

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
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent {
  clases: Clase[] = [];
  clasesFiltradas: Clase[] = [];
  filtroTipo: string = '';
  filtroFecha: string = '';

  constructor(
    private api: ApiService,
    private firestore: Firestore,
    private auth: Auth
  ) {
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

  async reservarClase(clase: Clase) {
    const usuario = this.auth.currentUser!;
    const reserva = {
      ...clase,
      nombreUsuario: usuario.displayName || 'Usuario sin nombre',
      correoUsuario: usuario.email || 'Sin correo',
      fechaReserva: new Date().toISOString(),
    };

    try {
      const reservasRef = collection(this.firestore, 'reservas');
      await addDoc(reservasRef, reserva);
      Swal.fire(
        'Reserva realizada',
        `Clase de ${clase.tipo} reservada con éxito.`,
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error',
        'No se pudo guardar la reserva. Intenta de nuevo.',
        'error'
      );
      console.error(error);
    }
  }
}
