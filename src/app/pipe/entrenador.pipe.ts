import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entrenador',
  standalone: false
})
export class EntrenadorPipe implements PipeTransform {

  transform(nombre: string): string {
    const imagenes: { [key: string]: string } = {
      'Carlos Fernández': 'assets/images/carlos.jpg',
      'Ana Gómez': 'assets/images/ana.jpg',
      'Luis Martínez': 'assets/images/luis.jpg',
      'María Rodríguez': 'assets/images/maria.jpg',
      'Javier Pérez': 'assets/images/javi.jpg',
      'Lucía Sánchez': 'assets/images/lucia.webp'
    };
    
    return imagenes[nombre] || 'assets/images/default.jpg';
  }

}
