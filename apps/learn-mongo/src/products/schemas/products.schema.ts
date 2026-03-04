import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Tag } from './tag.schema';

@Schema()
export class Products extends Document {
  @Prop()
  title!: string;

  @Prop({ type: [Tag] })
  tags!: Tag[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
