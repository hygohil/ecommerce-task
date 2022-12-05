import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findByUserIdAndUpdate(
    userId: number,
    updateObject: Prisma.UserUpdateInput,
  ): Promise<User> {
    await this.prisma.user.update({
      where: { id: userId },
      data: updateObject,
    });
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

  async updateUserById(
    userId: number,
    updateObject: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateObject,
    });
  }
}
