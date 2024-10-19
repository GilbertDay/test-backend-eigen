import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { BookService } from './service/book.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService, MongooseModule],
})
export class BookModule {}
