import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Member } from '../schemas/member.schema';
import { MemberService } from '../service/member.service';

@Controller('/api/member')
export class MemberController {
  constructor(private memberService: MemberService) {}

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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: {
          type: 'string',
          example: 'M001',
        },
        bookCode: {
          type: 'string',
          example: 'TW-11',
        },
      },
    },
  })
  @Post('/borrow-book')
  async borrowBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.memberService.borrowBook(memberCode, bookCode);
  }

  @ApiTags('Members Returns Books')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: {
          type: 'string',
          example: 'M001',
        },
        bookCode: {
          type: 'string',
          example: 'TW-11',
        },
      },
    },
  })
  @Post('/return-book')
  async returnBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    return this.memberService.returnBook(memberCode, bookCode);
  }
}
