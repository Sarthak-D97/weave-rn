import { Injectable } from '@nestjs/common';
import { Products } from './schemas/products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<Products>,
  ) {}

  async createProduct(): Promise<Products> {
    const product = new this.productModel({
      title: 'gaming pc',
      tags: [{ name: 'electronics' }, { name: 'gaming' }, { name: 'laptop' }],
    });
    return product.save();
  }
  async findAll(): Promise<Products[]> {
    return this.productModel.find().exec();
  }
}
