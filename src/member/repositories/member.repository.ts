import { Member } from '../schemas/member.schema';

export interface IMemberRepository {
  findAll(): Promise<Member[]>;
  createMember(member: Member): Promise<Member[]>;
  borrowBook(memberCode: string, bookCode: string): Promise<Member>;
  returnBook(memberCode: string, bookCode: string): Promise<Member>;
}
