import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 15; i++) {
    await prisma.concert.create({
      data: {
        performer: faker.person.fullName(),
        startTime: faker.date.future(),
        duration: faker.number.int({ min: 60, max: 180 }),
        cancelled: Math.random() < 0.2,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });