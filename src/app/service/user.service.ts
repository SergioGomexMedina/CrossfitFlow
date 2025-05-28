// services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private selectedAvatar = new BehaviorSubject<string>(''); // guarda la ruta de la imagen
  selectedAvatar$ = this.selectedAvatar.asObservable();

  setAvatar(path: string) {
    this.selectedAvatar.next(path);
  }
}
