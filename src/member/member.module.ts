import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { MemberService } from './member.service';
import { BookService } from 'src/book/book.service';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
    BookModule,
  ],
  providers: [MemberService, BookService],
  controllers: [MemberController],
})
export class MemberModule {}
