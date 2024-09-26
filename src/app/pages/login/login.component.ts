import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Sửa lỗi ở đây: 'styleUrl' => 'styleUrls'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleLogin() {
    console.log(this.loginForm);

    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        // Lưu token và vai trò vào auth service
        this.authService.setAuth(data.token, data.role); // Lưu token và vai trò từ phản hồi

        // Điều hướng dựa trên vai trò
        if (this.authService.isUserAdmin()) {
          this.router.navigateByUrl('/admin'); // Điều hướng đến trang admin nếu là admin
        } else {
          this.router.navigateByUrl('/'); // Điều hướng đến trang chính
        }
      },
      error: () => alert('Error'),
    });
  }
}
