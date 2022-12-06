import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserResponseDTO {
  @ApiProperty({
    example: {
      id: 1,
      email: 'demo@test.io',
      name: ' demo test',
      DOB: '2022-12-05T07:25:36.315Z',
    },
  })
  user: User;
}
