import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserauthService } from '../../service/userauth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userAuthService: UserauthService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value 
      ? null : { mismatch: true };
  }

  // Método para manejar el registro
  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Revisa los campos e inténtalo de nuevo.";
      return;
    }
  
    const { fullName, email, password } = this.registerForm.value;
  
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
  
    try {
      const result = await this.userAuthService.registerUser(fullName, email, password);
      if (result.success) {
        Swal.fire('¡Registrado!', 'Usuario registrado correctamente', 'success');
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Error en el registro. Intenta de nuevo.';
      }
    } catch (error: any) {
      // Manejo seguro del error
      this.errorMessage = this.getErrorMessage(error);
    }
  }
  
  // Método para extraer mensaje de error de Firebase u otro error inesperado
  private getErrorMessage(error: any): string {
    if (error?.message) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ocurrió un error inesperado. Intenta de nuevo.';
  }
  
  goToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
