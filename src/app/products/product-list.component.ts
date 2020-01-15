
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY, Subject, combineLatest } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
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
  private categorySelectedSubject = new Subject<number>();
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest ([
    this.productService.productWithCategory$,
    this.categorySelectedAction$.pipe(startWith(0))
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
