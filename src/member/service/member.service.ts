import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from '../schemas/member.schema';
import mongoose from 'mongoose';
import { BorrowedBook } from '../schemas/borrowedBook.schema';
import { Book } from '../../book/schemas/book.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: mongoose.Model<Member>,
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Member[]> {
    const member = await this.memberModel.find().exec();
    return member;
  }

  async createMember(member: Member): Promise<Member> {
    const res = await this.memberModel.create(member);
    return res;
  }

  async borrowBook(memberCode: string, bookCode: string): Promise<Member> {
    // Cari member berdasarkan kode
    const member = await this.memberModel.findOne({ code: memberCode });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    // Anggota saat ini tidak sedang dikenakan penalti
    const today = new Date();
    if (member.penalty_end_date && member.penalty_end_date > today) {
      throw new BadRequestException(
        `Member is under penalty until ${member.penalty_end_date.toDateString()}`,
      );
    }

    // Anggota tidak diperbolehkan meminjam lebih dari 2 buku
    if (member.borrowed_books.length >= 2) {
      throw new BadRequestException(
        'Member tidak bisa meminjam lebih dari 2 buku',
      );
    }

    // Cek apakah member sudah meminjam buku yang sama
    const alreadyBorrowed = member.borrowed_books.some(
      (book) => book.code === bookCode,
    );

    if (alreadyBorrowed) {
      throw new BadRequestException('Member sudah meminjam buku ini');
    }

    // Cek ketersediaan buku di dalam koleksi Books
    const book = await this.bookModel.findOne({ code: bookCode });

    if (!book) {
      throw new BadRequestException('Buku tidak ditemukan');
    }

    // Cek apakah stok buku tersedia
    if (book.stock <= 0) {
      throw new BadRequestException('Stok buku tidak tersedia');
    }

    // Menambahkan buku ke daftar borrowed_books
    const newBorrowedBook: BorrowedBook = {
      code: bookCode,
      borrow_date: today,
      due_date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Jatuh tempo 7 hari dari hari ini
    };

    member.borrowed_books.push(newBorrowedBook);

    // Kurangi stok buku
    book.stock -= 1;

    await member.save();
    await book.save();

    return member;
  }

  async returnBook(memberCode: string, bookCode: string): Promise<Member> {
    // Cari member berdasarkan kode
    const member = await this.memberModel.findOne({ code: memberCode });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    // Cari buku berdasarkan kode
    const book = await this.bookModel.findOne({ code: bookCode });

    if (!book) {
      throw new BadRequestException('Buku tidak ditemukan');
    }

    // Cari buku yang dipinjam
    const borrowedBook = member.borrowed_books.find(
      (book) => book.code === bookCode,
    );

    if (!borrowedBook) {
      throw new BadRequestException('Buku tidak dipinjam');
    }

    const today = new Date();
    const dueDate = new Date(borrowedBook.due_date);

    // Cek apakah buku dikembalikan lewat dari jatuh tempo
    if (today > dueDate) {
      member.penalty_end_date = new Date(
        today.getTime() + 3 * 24 * 60 * 60 * 1000,
      );
    }

    member.borrowed_books = member.borrowed_books.filter(
      (book) => book.code !== bookCode,
    );

    book.stock += 1;

    // Simpan perubahan di kedua model (member dan book)
    await member.save();
    await book.save();

    return member;
  }
}
