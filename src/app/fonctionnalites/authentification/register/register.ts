import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../utilisateurs/services/user';

@Component({
  selector: 'app-register',

  imports: [FormsModule, RouterLink],

  templateUrl: './register.html',

  styleUrl: './register.css'
})

export class Register {

  formData = {

    email: '',

    username: '',

    password: '',

    first_name: '',

    last_name: ''

  };

  constructor(

    private UserService: UserService,

    private router: Router

  ) {}

  inscription() {

    this.UserService
      .inscription(
        this.formData
      )
      .subscribe({

        next: () => {

          alert(
            'Compte créé'
          );

          this.router.navigate([
            '/login'
          ]);

        }

      });

  }

}