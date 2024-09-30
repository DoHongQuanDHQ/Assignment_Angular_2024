import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './../../components/header/header.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  products: Product[] = [];
  toast = inject(HotToastService);
  router = inject(Router);
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => this.toast.error('Error: ' + e.message),
    });
  }
  deleteProduct(id: number) {
    if (confirm('Bạn có muốn xóa sản phẩm không?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toast.success('Xóa sản phẩm thành công!');
          this.loadProducts(); // Cập nhật danh sách sau khi xóa
        },
        error: (e) => this.toast.error('Error: ' + e.message),
      });
    }
  }
}
