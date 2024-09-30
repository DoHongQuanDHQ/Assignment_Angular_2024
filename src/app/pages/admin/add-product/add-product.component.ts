import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    image: '',
  };
  productForm: FormGroup = {} as FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }
  ngOnInit(): void {}
  handleSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService
        .createProduct(this.productForm.value)
        .subscribe((data) => {
          console.log('Create product successfully!', data);
          this.router.navigate(['/admin']);
          alert('Create product successfully!');
        });
    }
  }
}
