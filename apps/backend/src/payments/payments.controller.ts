import { Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('course/:courseId')
  createPayment(@Param('courseId') courseId: string, @Req() req: any) {
    return this.paymentsService.createPaymentIntent(req.user.sub, courseId);
  }

  @Get()
  getMyPayments(@Req() req: any) {
    return this.paymentsService.getUserPayments(req.user.sub);
  }
}
