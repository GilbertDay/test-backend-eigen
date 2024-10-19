import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';

export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAvailBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    const availableBooks = books.filter((book) => book.stock > 0);
    return availableBooks;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }
}
