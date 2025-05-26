import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Clase {
  tipo: string;
  entrenador: string;
  fecha: string;
  duracion: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://run.mocky.io/v3/c12eea04-dd43-4b69-8382-14ffd0ae73bb';
  constructor(private http: HttpClient) {}

  getClases(): Observable<{ clases: Clase[] }> {
    return this.http.get<{ clases: Clase[] }>(this.apiUrl);
  }
}
