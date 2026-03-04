import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => ID)
    @IsNotEmpty()
    id!: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
}