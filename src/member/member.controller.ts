import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { Member } from './schemas/member.schema';
import { BookService } from 'src/book/book.service';

@Controller('/api/member')
export class MemberController {
  constructor(
    private memberService: MemberService,
    private bookService: BookService,
  ) {}

  @ApiTags('View Members & Borrowed Books')
  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Get all members',
  })
  async getAllMember(): Promise<Member[]> {
    return await this.memberService.findAll();
  }

  @ApiTags('Create Members')
  @Post()
  async createMember(@Body() member: Member): Promise<Member> {
    return await this.memberService.createMember(member);
  }

  @ApiTags('Members Borrowed Books')
  @Post('/borrow-book')
  async borrowBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.memberService.borrowBook(memberCode, bookCode);
  }

  @ApiTags('Members Returns Books')
  @Post('/return-book')
  async returnBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.memberService.returnBook(memberCode, bookCode);
  }
}
