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
  private apiUrl = 'https://run.mocky.io/v3/3d85caff-9293-4907-b8a6-b50c540bc934';
  constructor(private http: HttpClient) {}

  getClases(): Observable<{ clases: Clase[] }> {
    return this.http.get<{ clases: Clase[] }>(this.apiUrl);
  }
}
