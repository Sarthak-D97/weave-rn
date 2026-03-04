import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create() {
    return this.productService.createProduct();
  }

  @Get()
  getAll() {
    return this.productService.findAll();
  }
}
