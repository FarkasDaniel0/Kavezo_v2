import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  const concerts = Array.from({ length: 5 }, () => ({
    performer: faker.music.bandName(),
    startTime: faker.date.future(),
    duration: faker.number.int({ min: 60, max: 180 }), // percben tárolva
    cancelled: false,
  }));

  await prisma.concert.createMany({ data: concerts });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());