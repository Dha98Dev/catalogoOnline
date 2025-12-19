import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Datos incompletos',
        detail: 'Todos los campos son requeridos',
        life: 3000,
      });
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.ok) {
          this.messageService.add({
          severity: 'success',
          summary: 'Bienvenido !',
          detail: 'Sesion iniciada correctamente',
          life: 3000,
        });
        this.authService.saveToken(resp.token)
        this.router.navigate(['/a/add_design'])
        }
        else{
          this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: resp.mensaje,
          life: 3000,
        });
        }
      },
      error: (err) => {
          this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrio un error al iniciar sesión',
          life: 3000,
        });
      },
    });
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  redireccionarHome() {
    this.router.navigate(['/c']);
  }
}
