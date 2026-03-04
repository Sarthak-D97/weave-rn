import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schemas/library.schema';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Library.name) private libraryModel: Model<Library>,
  ) {}

  async create(): Promise<Library> {
    const book1 = await new this.bookModel({
      title: 'Jenkins',
      author: 'sarthak',
    }).save();
    const book2 = await new this.bookModel({
      title: 'gitlab',
      author: 'linus',
    }).save();
    const library = await new this.libraryModel({
      name: 'Anther',
      books: [book1._id, book2._id],
    });
    return library.save();
  }
  async getlib(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
