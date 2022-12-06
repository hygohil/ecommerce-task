import { Injectable } from '@nestjs/common';
import { ShoppingPreference, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShoppingPreferenceService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.ShoppingPreferenceCreateInput,
  ): Promise<ShoppingPreference> {
    return this.prisma.shoppingPreference.create({
      data,
    });
  }
}
