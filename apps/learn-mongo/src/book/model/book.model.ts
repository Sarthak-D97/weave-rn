import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';

import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book extends Document {
    @Field(() => ID)
    declare readonly _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    title!: string;

    @Prop({ required: true })
    @Field({nullable: true})
    description?: string;

    @Prop({ required: true })
    @Field()
    author!: string;

    @Prop({ required: true })
    @Field()
    publishedDate!: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book);