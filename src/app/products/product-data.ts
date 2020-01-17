import { Product } from './product';

export class ProductData {

  static products: Product[] = [
    {
      id: 1,
      productName: 'Cricket Bats',
      productCode: 'CB-0011',
      description: 'English Willow A-Grade Bats',
      price: 15000,
      categoryId: 1,
      quantityInStock: 15,
      supplierIds: [1, 2]
    },
    {
      id: 2,
      productName: 'Batting Helmet',
      productCode: 'BH-0023',
      description: 'Shrey Masterclass Air Titanium ',
      price: 10000,
      categoryId: 1,
      quantityInStock: 4,
      supplierIds: [3, 4]
    },
    {
      id: 7,
      productName: 'Knee Support',
      productCode: 'KS-0022',
      description: 'Knee Guard for absorbing pressure',
      price: 1000,
      categoryId: 3,
      quantityInStock: 8,
      supplierIds: [7, 8]
    },
    {
      id: 8,
      productName: 'Bowling Shoes',
      productCode: 'BS-0018',
      description: 'Full spikes for bowling',
      price: 12000,
      categoryId: 3,
      quantityInStock: 10,
      supplierIds: [7, 8]
    },
    {
      id: 9,
      productName: 'Keeping Gloves',
      productCode: 'KG-0042',
      description: 'SG Xtreme RSD Gloves',
      price: 2500,
      categoryId: 5,
      quantityInStock: 12,
      supplierIds: [9, 10]
    },
    {
      id: 5,
      productName: 'Batting Pads',
      productCode: 'BP-0048',
      description: 'Moonwalker pads in different colors',
      price: 3500,
      categoryId: 1,
      quantityInStock: 6,
      supplierIds: [5, 6]
    },
    {
      id: 10,
      productName: 'Keeping Pads',
      productCode: 'KG-0066',
      description: 'Puma Pads and Shin Guards',
      price: 3000,
      categoryId: 5,
      quantityInStock: 6,
      supplierIds: [9, 10]
    }
  ];
}
