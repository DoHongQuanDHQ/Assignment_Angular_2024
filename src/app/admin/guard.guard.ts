import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : [];
  console.log(userObj);
  if (userObj.role === 'admin') {
    return true;
  }
  return router.navigateByUrl('/');
};
