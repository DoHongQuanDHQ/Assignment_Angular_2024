import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProductDetail(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`http://localhost:3000/products/`, product);
  }

  updateProduct(product: Product) {
    return this.http.patch(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: string | number | undefined) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
