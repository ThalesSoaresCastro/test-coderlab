import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function main() {
  const mainCategoriesData: Prisma.CategoryCreateManyInput[] = [
    { name: 'Electronics' },
    { name: 'Clothing' },
    { name: 'Home & Garden' },
  ];

  await prisma.category.createMany({
    data: mainCategoriesData,
    skipDuplicates: true,
  });

  const mainCategories = await prisma.category.findMany();

  const electronicsCategory = mainCategories.find(
    (category) => category.name === 'Electronics',
  );

  if (electronicsCategory) {
    const electronicsSubcategoriesData: Prisma.CategoryCreateManyInput[] = [
      { name: 'Cell Phones', parentId: electronicsCategory.id },
      { name: 'Computers', parentId: electronicsCategory.id },
      { name: 'TVs', parentId: electronicsCategory.id },
    ];

    await prisma.category.createMany({
      data: electronicsSubcategoriesData,
      skipDuplicates: true,
    });
  }

  const allCategories = await prisma.category.findMany();

  for (let i = 0; i < 20; i++) {
    const randomCategory =
      allCategories[faker.number.int({ min: 0, max: allCategories.length - 1 })];

    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        qty: faker.number.int({ min: 0, max: 100 }),
        price: parseFloat(faker.commerce.price()),
        photo: faker.image.url(),
        categories: {
          connect: [{ id: randomCategory.id }],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });