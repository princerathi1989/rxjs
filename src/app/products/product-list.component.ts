
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;
  selectedCategoryId = 1;

  products$ = this.productService.productWithCategory$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  productsSimpleFilter$ = this.productService.productWithCategory$
  .pipe(
    map(products =>
      products.filter(product =>
        this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
      )
    )
  );

  constructor(private productService: ProductService) { }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
