import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BorrowedBook } from './borrowedBook.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Member extends Document {
  @ApiProperty({ description: 'The code of the book', example: 'M001' })
  @Prop()
  code: string;

  @ApiProperty({
    description: 'The name of the book',
    example: 'Angga',
  })
  @Prop()
  name: string;

  @ApiProperty({ type: [BorrowedBook], default: [] })
  @Prop()
  borrowed_books: BorrowedBook[];

  @ApiProperty({
    type: Date,
    default: null,
  })
  @Prop()
  penalty_end_date: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.set('toJSON', {
  transform: (doc, data) => {
    return {
      code: data.code,
      name: data.name,
      penalty_end_date: data.penalty_end_date,
      borrowed_books: data.borrowed_books,
    };
  },
});
