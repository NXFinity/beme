import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { User } from '../../api/users/entities/user.entity';
import * as ejs from 'ejs';
import * as path from 'path';
import {UsersService} from "../../api/users/users.service";
require('dotenv').config();

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private usersService: UsersService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(user: User) {
    const verificationToken = this.generateVerificationToken();

    // Save the verification token to the user entity
    user.verifyToken = verificationToken;
    await this.usersService.save(user);

    const url = `${process.env.SERVER_DOMAIN}/verify?token=${verificationToken}`;

    // Render the EJS template with the user data and verification URL
    const emailHtml = await ejs.renderFile(
      path.join(__dirname, './templates/verificationEmail.ejs'),
      { user, url, verificationToken },
    );

    const mailOptions = {
      from: '"BEAMIFY ME" <' + process.env.SMTP_USERNAME + '>',
      to: user.email,
      subject: 'Account Verification',
      html: emailHtml, // Use the rendered HTML as the email content
      attachments: [
        {
          filename: 'beamify.png',
          path: path.join(__dirname, './templates/assets/beamify.png'),
          cid: 'beamifyLogo', //same cid value as in the html img src
        },
      ],
    };
    return this.transporter.sendMail(mailOptions);
  }

  generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}
