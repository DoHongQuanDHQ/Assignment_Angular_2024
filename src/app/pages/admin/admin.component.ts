import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './../../components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
