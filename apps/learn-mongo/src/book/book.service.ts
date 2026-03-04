import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async create(createBookDto: CreateBookInput): Promise<Book> {
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }
    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }
    async findOne(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new Error(`Book with ID ${id} not found`);
        }
        return book;
    }
    async update(id: string, updateBookDto: UpdateBookInput): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
        if (!updatedBook) {
            throw new Error(`Book with ID ${id} not found`);
        }
        return updatedBook.save();
    }
    async remove(id: string): Promise<Boolean> {
        const removedBook = await this.bookModel.findByIdAndDelete(id).exec();
        if (!removedBook) {
            throw new Error(`Book with ID ${id} not found`);
        }
        return true;
    }   
}
