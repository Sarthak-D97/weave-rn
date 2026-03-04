import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './resolvers/book/book.resolver';
import { Book, BooksSchema } from './model/book.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }])
  ],
  controllers: [],
  providers: [BookService, BookResolver]
})
export class BookModule {}
