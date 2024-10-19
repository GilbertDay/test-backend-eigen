import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class BorrowedBook {
  @Prop()
  code: string;

  @Prop()
  borrow_date: Date;

  @Prop()
  due_date: Date;
}

export const BorrowedBookSchema = SchemaFactory.createForClass(BorrowedBook);
