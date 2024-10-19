import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import mongoose from 'mongoose';
import { IBookRepository } from '../repositories/book.repository';

export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookRepository: IBookRepository,
  ) {}

  async findAvailBooks(): Promise<Book[]> {
    const books = await this.bookRepository.findAvailBooks();
    const availableBooks = books.filter((book) => book.stock > 0);
    return availableBooks;
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookRepository.createBook(book);
    return res;
  }
}
