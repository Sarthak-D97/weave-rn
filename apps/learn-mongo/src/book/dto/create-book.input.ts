import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

@InputType()
export class CreateBookInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    title!: string;

    @Field({ nullable: true })
    @IsString()
    description?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    author!: string;
}