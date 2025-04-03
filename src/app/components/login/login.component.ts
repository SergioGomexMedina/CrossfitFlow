import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../../service/userauth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userservice: UserauthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.userservice.login(this.loginForm.value).then(response => {
      if (response.user) {
        this.router.navigate(['/inicio']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    }).catch(error => {
      console.error(error);
      this.errorMessage = 'Hubo un problema al intentar iniciar sesión. Intenta de nuevo más tarde.';
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToPass(event: Event) {
    event.preventDefault();
    this.router.navigate(['/pass']);
  }
}
