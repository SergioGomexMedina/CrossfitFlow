import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  setFotoPerfil(url: string) {
    localStorage.setItem('fotoPerfilURL', url);
  }

  getFotoPerfil(): string | null {
    return localStorage.getItem('fotoPerfilURL');
  }

  actualizarImagenNavbar() {
    const url = this.getFotoPerfil();
    if (url) {
      const navbarImg = document.querySelector('img[alt="perfil"]') as HTMLImageElement;
      if (navbarImg) {
        navbarImg.src = url;
      }
    }
  }
}
