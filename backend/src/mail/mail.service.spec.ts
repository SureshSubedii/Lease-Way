import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

describe('MailService', () => {
  let mailService: MailService;
  let mockMailerService: Partial<MailerService>;
  mockMailerService = {
    sendMail: jest.fn() as jest.Mock<
      Promise<SentMessageInfo>,
      [ISendMailOptions]
    >,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mockMailerService = module.get<MailerService>(
      MailerService,
    ) as unknown as MailerService;
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should send mail', async () => {
    const email = 'test@example.com';
    const content = '123456';

    const mockSentMessageInfo: SentMessageInfo = {
      messageId: '123',
      response: '250 OK',
      envelope: {
        from: 'Lease Way',
        to: [email],
      },
    };
    (mockMailerService.sendMail as jest.Mock).mockResolvedValue(
      mockSentMessageInfo,
    );

    const result = await mailService.sendMail(email, content);

    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      from: 'Lease Way',
      to: email,
      subject: 'OTP for verification',
      text: `Your OTP for verification is ${content}. Please use this OTP within 2 minutes.`,
    });
    expect(result).toEqual(mockSentMessageInfo);
  });
});
