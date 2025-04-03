import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserauthService } from '../../service/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass',
  standalone: false,
  templateUrl: './pass.component.html',
  styleUrl: './pass.component.css'
})
export class PassComponent {
  email: string = '';
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: UserauthService, private router : Router) {}

  onSubmit() {
    if (!this.email) return;

    this.authService.resetPassword(this.email)
      .then(() => {
        this.message = 'Correo de restablecimiento enviado. Revisa tu bandeja de entrada.';
        this.errorMessage = null;
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = 'Error al enviar el correo. Verifica el email.';
        this.message = null;
      });
  }
  goToInicio() {
    this.router.navigate(['/login']);
  }
}
