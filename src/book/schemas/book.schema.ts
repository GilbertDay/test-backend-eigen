import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @ApiProperty({ description: 'The code of the book', example: 'TW-11' })
  @Prop()
  code: string;

  @ApiProperty({
    description: 'The title of the book',
    example: 'Stephenie Meyer',
  })
  @Prop()
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'Stephenie Meyer',
  })
  @Prop()
  author: string;

  @ApiProperty({ description: 'The stock of the book', example: 1 })
  @Prop()
  stock: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
