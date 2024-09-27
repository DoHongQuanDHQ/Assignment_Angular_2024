import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type User = {
  email: string;
  password: string;
  role: string;
};

type LoginResponse = {
  accessToken: string;
  user: User; // Thêm vai trò vào phản hồi
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null; // Lưu trữ token
  private userRole: string | null = null; // Lưu trữ vai trò người dùng

  http = inject(HttpClient);

  registerUser(data: User) {
    return this.http.post('http://localhost:3000/register', data);
  }

  loginUser(data: User) {
    return this.http.post<LoginResponse>('http://localhost:3000/login', data);
  }

  // Phương thức để lưu trữ token và vai trò người dùng

  // Phương thức để lấy token

  // Phương thức kiểm tra xem người dùng có phải là admin hay không
  isAdmin(): boolean {
    const user = this.getUser();
    return this.userRole === 'admin'; // Kiểm tra vai trò
  }
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Phương thức để xóa thông tin xác thực khi người dùng đăng xuất
  logout() {
    this.token = null;
    this.userRole = null;
    localStorage.removeItem('token'); // Xóa token từ localStorage
  }
}
