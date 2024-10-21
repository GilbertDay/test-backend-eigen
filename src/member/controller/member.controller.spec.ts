import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from '../service/member.service';
import { Member } from '../schemas/member.schema';

describe('MemberController', () => {
  let controller: MemberController;

  const mockMemberService = {
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          code: 'M001',
          name: 'Angga',
          penalty_end_date: '2024-10-22T11:46:43.046Z',
          borrowed_books: [],
        },
      ];
    }),
    createMember: jest.fn().mockImplementation(() => {
      return [
        {
          code: 'M004',
          name: 'Dwi',
          penalty_end_date: null,
          borrowed_books: [],
        },
      ];
    }),
    borrowBook: jest.fn().mockImplementation(() => {
      return 'borrowBook';
    }),
    returnBook: jest.fn().mockImplementation(() => {
      return 'returnBook';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService],
    })
      .overrideProvider(MemberService)
      .useValue(mockMemberService)
      .compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should return all members', async () => {
    expect(await controller.getAllMember()).toEqual([
      {
        code: 'M001',
        name: 'Angga',
        penalty_end_date: '2024-10-22T11:46:43.046Z',
        borrowed_books: [],
      },
    ]);
  });

  it('should return new members', async () => {
    const newMember: Member = {
      code: 'M004',
      name: 'Dwi',
    } as Member;

    const result = await controller.createMember(newMember);

    expect(result).toEqual([
      {
        code: 'M004',
        name: 'Dwi',
        penalty_end_date: null,
        borrowed_books: [],
      },
    ]);
  });
});
