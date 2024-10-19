import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BorrowedBook } from './borrowedBook.schema';

@Schema()
export class Member extends Document {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop({ type: [BorrowedBook], default: [] })
  borrowed_books: BorrowedBook[];

  @Prop({
    type: Date,
    default: null,
  })
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
