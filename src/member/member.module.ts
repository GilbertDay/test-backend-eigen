import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { MemberService } from './service/member.service';
import { BookService } from 'src/book/service/book.service';
import { BookModule } from 'src/book/book.module';
import { MemberController } from './controller/member.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
    BookModule,
  ],
  providers: [MemberService, BookService],
  controllers: [MemberController],
})
export class MemberModule {}
