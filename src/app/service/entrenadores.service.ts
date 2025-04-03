import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {
  private apiUrl = 'https://run.mocky.io/v3/9b3e1cdc-5e7e-418d-861b-712b600776e0';

  constructor(private http: HttpClient) {}

  obtenerEntrenadores(): Observable<{ entrenadores: Entrenador[] }> {
    return this.http.get<{ entrenadores: Entrenador[] }>(this.apiUrl);
  }
}
