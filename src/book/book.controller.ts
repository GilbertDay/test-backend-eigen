import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiTags('Books')
  @Get()
  findAll() {
    return this.bookService.findAll();
  }
  @ApiTags('Books')
  @Post()
  async createBook(@Body() book: Book): Promise<Book> {
    return await this.bookService.createBook(book);
  }
}
