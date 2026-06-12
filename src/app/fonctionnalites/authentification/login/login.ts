import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authentification';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule, RouterLink]
})

export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
  private authService: AuthService,
  private router: Router
) { }

  login() {

    this.errorMessage = null;
    this.isLoading = true;
    this.authService.login(
      this.formData
    ).subscribe({

      next: (response: any) => {

        localStorage.setItem(
          'access',
          response.access
        );

        localStorage.setItem(
          'refresh',
          response.refresh
        );
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Email ou mot de passe incorrect.";
        console.log(error);
      }

    });
  }
}