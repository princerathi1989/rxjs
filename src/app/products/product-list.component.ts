import { ProductCategoryService } from './../product-categories/product-category.service';
import { catchError, map } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, combineLatest, BehaviorSubject } from 'rxjs';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

  products$ = combineLatest([
    this.productService.productWithCategory$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, selectedCategoryId]) => 
        products.filter(product => 
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )
      ),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
