// import { Component, inject } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'], // Sửa lỗi ở đây: 'styleUrl' => 'styleUrls'
// })
// export class LoginComponent {
//   authService = inject(AuthService);
//   router = inject(Router);

//   loginForm: FormGroup = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [
//       Validators.required,
//       Validators.minLength(6),
//     ]),
//   });

// }
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  authService = inject(AuthService);
  router = inject(Router);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken);
        this.router.navigateByUrl('');
      },
      error: () => alert('Error'),
    });
  }
}
