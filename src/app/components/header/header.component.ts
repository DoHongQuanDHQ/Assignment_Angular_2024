import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // Kiểm tra xem người dùng có phải là admin không
  isAdmin() {
    return this.authService.isAdmin();
  }
  // Phương thức Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
