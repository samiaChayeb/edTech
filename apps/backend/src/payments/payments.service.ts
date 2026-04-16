import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Mock Stripe service for local development.
 * Replace with real Stripe SDK calls in production.
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private useMock: boolean;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const key = this.config.get('STRIPE_SECRET_KEY', '');
    this.useMock = !key || key.startsWith('sk_test_mock');
    if (this.useMock) this.logger.warn('⚠️  Stripe in MOCK mode – no real charges');
  }

  async createPaymentIntent(userId: string, courseId: string) {
    const course = await this.prisma.course.findUniqueOrThrow({ where: { id: courseId } });

    if (this.useMock) {
      // Simulate successful payment
      const payment = await this.prisma.payment.create({
        data: {
          amount: course.price,
          currency: 'eur',
          status: 'SUCCEEDED',
          stripePaymentId: `mock_pi_${Date.now()}`,
          userId,
          courseId,
        },
      });
      // Auto-enroll
      await this.prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: { status: 'ACTIVE' },
        create: { userId, courseId, status: 'ACTIVE' },
      });
      return { clientSecret: 'mock_secret', payment };
    }

    // Real Stripe integration (uncomment when ready)
    // const stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'));
    // const intent = await stripe.paymentIntents.create({ amount: course.price * 100, currency: 'eur' });
    const payment = await this.prisma.payment.create({
      data: { amount: course.price, userId, courseId, status: 'PENDING' },
    });
    return { clientSecret: 'replace_with_real_secret', payment };
  }

  async getUserPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { course: { select: { id: true, title: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
