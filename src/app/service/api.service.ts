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
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://run.mocky.io/v3/fb467147-a73d-49cd-b90a-64fc9aa6972b';
  constructor(private http: HttpClient) {}

  getClases(): Observable<{ clases: Clase[] }> {
    return this.http.get<{ clases: Clase[] }>(this.apiUrl);
  }
}
