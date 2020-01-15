
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest ([
    this.productService.productWithCategory$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, categoryId]) =>
        products.filter(product =>
          categoryId ? product.categoryId === categoryId : true
        )
      ),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private productCategoryService: ProductCategoryService, private productService: ProductService) { }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}
