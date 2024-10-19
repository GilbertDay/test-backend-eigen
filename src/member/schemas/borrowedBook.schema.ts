import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowedBook {
  @ApiProperty({ description: 'The code of the borrowed book' })
  @Prop()
  code: string;

  @ApiProperty({ description: 'The borrow_date of the borrowed book' })
  @Prop()
  borrow_date: Date;

  @ApiProperty({ description: 'The due_date of the borrowed book' })
  @Prop()
  due_date: Date;
}

export const BorrowedBookSchema = SchemaFactory.createForClass(BorrowedBook);
