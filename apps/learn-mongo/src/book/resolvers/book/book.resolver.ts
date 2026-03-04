import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from 'src/book/book.service';
import { CreateBookInput } from 'src/book/dto/create-book.input';
import { UpdateBookInput } from 'src/book/dto/update-book.input';
import { Book } from 'src/book/model/book.model';

@Resolver(()=> Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Query(() => [Book], { name: 'books' })
    async books(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Query(() => Book, { name: 'book' })
    async book(@Args('id', { type: () => String }) id: string): Promise<Book> {
        return this.bookService.findOne(id);
    }

    @Mutation(() => Book)
    async createBook(@Args('input') input: CreateBookInput): Promise<Book> {
        return this.bookService.create(input);
    }

    @Mutation(() => Book)
    async updateBook(@Args('input') input: UpdateBookInput): Promise<Book> {
        return this.bookService.update(input.id, input);
    }

    @Mutation(() => Boolean)
    async deleteBook(@Args('id', { type: () => String }) id: string): Promise<Boolean> {
        return this.bookService.remove(id);
    }
}
