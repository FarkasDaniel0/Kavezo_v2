// Szükséges modulok importálása
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Prisma kliens példányosítása
const prisma = new PrismaClient();

// Fő függvény a tesztadatok generálásához
async function main() {
  // 15 koncert létrehozása
  for (let i = 0; i < 15; i++) {
    await prisma.concert.create({
      data: {
        // Véletlenszerű előadó név generálása
        performer: faker.person.fullName(),
        // Jövőbeli dátum generálása
        startTime: faker.date.future(),
        // Véletlenszerű időtartam 60 és 180 perc között
        duration: faker.number.int({ min: 60, max: 180 }),
        // 20% eséllyel lesz törölve a koncert
        cancelled: Math.random() < 0.2,
      },
    });
  }
}

// Program futtatása
main()
  .then(async () => {
    // Sikeres befejezés esetén kapcsolat bontása
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // Hiba esetén hibaüzenet kiírása
    console.error(e);
    // Kapcsolat bontása
    await prisma.$disconnect();
    // Program leállítása hibakóddal
    process.exit(1);
  });