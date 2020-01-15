import { catchError } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable, of, EMPTY } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
