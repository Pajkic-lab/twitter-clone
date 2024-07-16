import {
  randEmail,
  randFullName,
  randImg,
  randPassword,
  randUuid,
} from '@ngneat/falso';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const users = [];

  for (let i = 0; i < 50; i++) {
    users.push({
      email: randEmail(),
      password: randPassword(),
      name: randFullName(),
      avatar: 'https://picsum.photos/500/500',
      cover: 'https://picsum.photos/500/500',
      uniqueName: randUuid(),
      bio: 'try out',
      location: 'Serbia',
      website: 'https://example.com',
      social: {
        create: [
          {
            following: {
              connect: {
                id: 1,
              },
            },
          },
        ],
      },
    });
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
