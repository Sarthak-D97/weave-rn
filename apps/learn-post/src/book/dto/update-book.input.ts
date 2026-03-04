import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field()
    id!: string;

    @Field()
    title!: string;

    @Field()
    author!: string;
}