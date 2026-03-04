import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Library extends Document {
  @Prop()
  name!: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Book' }] })
  books!: Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
