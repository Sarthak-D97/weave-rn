import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Book } from './model/book.model';
import { BookService } from './book.service';
import { Query } from '@nestjs/graphql';
import { UpdateBookInput } from './dto/update-book.input';
import { CreateBookInput } from './dto/create-book.input';

@Resolver(()=> Book)
export class BookResolver {
    constructor(private bookService: BookService) {}

    @Query(() => [Book])
    findAll() {
        return this.bookService.findAll();
    }

    @Query(() => Book)
    findOne(@Args('id')id: string) {
        return this.bookService.findOne(id);
    }

    @Mutation(() => Book)
    createBook(@Args('data') data: CreateBookInput) {
        return this.bookService.create(data);
    }

    @Mutation(() => Book)
    updateBook(@Args('id') id: string, @Args('data') data: UpdateBookInput) {
        return this.bookService.update(id, data);
    }

    @Mutation(() => Book)
    removeBook(@Args('id')id: string) {
        return this.bookService.remove(id);
    }
}
