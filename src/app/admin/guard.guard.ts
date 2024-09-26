import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Đảm bảo đường dẫn chính xác tới AuthService
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Sử dụng inject để lấy AuthService

  // Kiểm tra xem người dùng có phải là admin không
  if (authService.isUserAdmin()) {
    return true; // Cho phép truy cập nếu là admin
  } else {
    return false; // Không cho phép truy cập nếu không phải admin
  }
};
