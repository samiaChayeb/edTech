import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@edtech.local' },
    update: {},
    create: {
      email: 'admin@edtech.local',
      password: hash,
      firstName: 'Admin',
      lastName: 'Platform',
      role: Role.ADMIN,
    },
  });

  const prof = await prisma.user.upsert({
    where: { email: 'prof@edtech.local' },
    update: {},
    create: {
      email: 'prof@edtech.local',
      password: hash,
      firstName: 'Jean',
      lastName: 'Dupont',
      role: Role.PROFESSOR,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@edtech.local' },
    update: {},
    create: {
      email: 'student@edtech.local',
      password: hash,
      firstName: 'Marie',
      lastName: 'Curie',
      role: Role.STUDENT,
    },
  });

  const course = await prisma.course.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Introduction à la programmation',
      description: 'Apprenez les bases de la programmation avec ce cours complet.',
      price: 49.99,
      status: 'PUBLISHED',
      authorId: prof.id,
      lessons: {
        create: [
          { title: 'Variables et types', order: 1, description: 'Les fondamentaux' },
          { title: 'Structures de contrôle', order: 2, description: 'If, else, boucles' },
        ],
      },
    },
  });

  console.log('🌱 Seed completed:', { admin: admin.email, prof: prof.email, student: student.email, course: course.title });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
