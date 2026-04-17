import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {}

  async sendPasswordResetEmail(email: string, resetToken: string, resetLink: string) {
    // En développement, afficher le lien en console
    if (this.config.get('NODE_ENV') === 'development') {
      console.log('📧 Password reset email would be sent to:', email);
      console.log('🔗 Reset link:', resetLink);
      return true;
    }

    // En production, implémenter avec nodemailer ou un service externe
    console.log('Email service - production not configured');
    return true;
  }
}
