import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';

export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    const availableBooks = books.filter((book) => book.stock > 0);
    return availableBooks;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }
}
