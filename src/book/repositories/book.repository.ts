import { Book } from '../schemas/book.schema';

export interface IBookRepository {
  findAvailBooks(): Promise<Book[]>;
  findAll(): Promise<Book[]>;
  createBook(book: Book): Promise<Book>;
}
