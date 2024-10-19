import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../schemas/book.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiTags('View Available Books')
  @Get('/available')
  findAvailBooks() {
    return this.bookService.findAvailBooks();
  }

  @ApiTags('View All Books')
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiTags('Create Books')
  @Post()
  async createBook(@Body() book: Book): Promise<Book> {
    return await this.bookService.createBook(book);
  }
}
