import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen',
  standalone: false
})
export class ImagenPipe implements PipeTransform {

  transform(tipo: string): string {
    const imagenes: { [key: string]: string } = {
      crossfit: '../../assets/cross1.jpg',
      undirance: '../../assets/cross2.jpg',
      halterofilia: '../../assets/cross3.jpg',
      openbox: '../../assets/cross4.jpg'
      
    };
    
    return imagenes[tipo.toLowerCase()] || 'assets/images/default.jpg';
  }

}
