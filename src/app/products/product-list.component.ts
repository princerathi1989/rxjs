import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY, BehaviorSubject, Subject, combineLatest } from 'rxjs';
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
  selectCategoryId = 1;
  errorMessage = '';
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  products$ = combineLatest([
    this.productService.productWithCategory$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([products, category]) =>
        products.filter(product =>
          category ? product.categoryId === category : true
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
